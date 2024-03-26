import { CLUSTER_URL } from "@/constants";
import { Account, MINT_SIZE, TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToInstruction, createTransferInstruction, getAccount, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, getMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionSignature } from "@solana/web3.js";
import pRetry from "p-retry";

export interface IMultiSender {
    address: string,
    amount: number
}

interface ITokenTransfer {
    account: Account,
    amount: number
}

class TokenManager {
    private mint: PublicKey;
    private connection: Connection;
    private wallet: Wallet;

    constructor(mint: PublicKey, wallet: Wallet) {
        this.mint = mint;
        this.connection = new Connection(CLUSTER_URL);
        this.wallet = wallet;
    }

    public getMintAccount() {
        return getMint(this.connection, this.mint);
    }

    public async getAssociatedTokenAccount(publicKey: PublicKey) {
        if (!this.wallet.adapter.publicKey) throw "NO WALLET";

        const mint = new PublicKey(this.mint);

        const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());


        const associatedToken = getAssociatedTokenAddressSync(
            mint,
            publicKey,
        );

        return await getAccount(this.connection, associatedToken)
            .then(res => {
                return res;
            })
            .catch(async () => {
                const transaction = new Transaction();

                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        payer,
                        associatedToken,
                        publicKey,
                        mint
                    )
                );

                const signature = await this.wallet.adapter.sendTransaction(
                    transaction,
                    this.connection
                );

                return pRetry(async (number) => {
                    console.log(`Retrying ${number} time`)
                    return await getAccount(this.connection, associatedToken);
                }, {
                    retries: 10,
                    minTimeout: 3000
                })
            });
    }

    public async transfer(from: PublicKey, to: PublicKey, amount: number) {
        const fromTokenAccount = await this.getAssociatedTokenAccount(from);
        const toTokenAccount = await this.getAssociatedTokenAccount(to);

        const transaction = new Transaction();

        transaction.add(
            createTransferInstruction(
                fromTokenAccount.address,
                toTokenAccount.address,
                from,
                amount,
            )
        )

        const signature = await this.wallet.adapter.sendTransaction(
            transaction,
            this.connection,
        );

        return signature;
    }

    public async mintTo(payer: PublicKey, amount: number) {
        const transaction = new Transaction();
        const fromTokenAccount = await this.getAssociatedTokenAccount(payer);

        transaction.add(
            createMintToInstruction(
                this.mint,
                fromTokenAccount.address,
                payer,
                amount * Math.pow(10, 9)
            )
        );

        const signature = await this.wallet.adapter.sendTransaction(
            transaction,
            this.connection,
        ).catch(error => {
            console.log(error);

            throw "We are unable to mint your token.";
        });

        return signature;
    }

    async createMint(amount: number, decimals: number): Promise<Keypair> {
        if (amount == 0) throw "Amount must be greater than zero";
        const connection = new Connection(CLUSTER_URL);

        if (!this.wallet.adapter.publicKey) throw "NO WALLET";

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const mintKeypair = Keypair.generate();
        const publicKey = this.wallet.adapter.publicKey;
        const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

        const transaction = new Transaction();

        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports: lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(
                mintKeypair.publicKey,
                decimals,
                publicKey,
                publicKey,
                TOKEN_PROGRAM_ID),
            createAssociatedTokenAccountInstruction(
                publicKey,
                tokenATA,
                publicKey,
                mintKeypair.publicKey,
            ),
            createMintToInstruction(
                mintKeypair.publicKey,
                tokenATA,
                publicKey,
                amount * Math.pow(10, decimals),
            ),
        );

        const signature = await this.wallet.adapter.sendTransaction(
            transaction,
            connection,
            { signers: [mintKeypair] });

        console.log({ mint: mintKeypair.publicKey.toBase58() })

        return mintKeypair
    }

    public async sendMultiple(destinations: Array<IMultiSender>): Promise<TransactionSignature> {
        if (!this.mint) throw new Error("Mint not yet created");

        if (!this.wallet.adapter.publicKey) throw "NO WALLET";

        if (destinations.length === 0) throw new Error("No valid destination found");

        const { value: tokenSupply } = await this.connection.getTokenSupply(this.mint);

        if (!tokenSupply) throw "No value found for the given token";

        try {
            const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());

            const transfers = await this.getAssociatedTokenAccounts(destinations);

            const fromTokenAccount = await this.getAssociatedTokenAccount(payer);

            const transaction = new Transaction();

            transfers.map(transfer => {
                const toTokenAccount = transfer.account;

                transaction.add(
                    createTransferInstruction(
                        fromTokenAccount.address,
                        toTokenAccount.address,
                        payer,
                        transfer.amount * Math.pow(10, tokenSupply.decimals),
                    )
                )
            })

            const signature = await this.wallet.adapter.sendTransaction(
                transaction,
                this.connection,
            );

            return signature;
        } catch (error) {
            throw "We're sorry, but there was an issue processing your transaction.";
        }

    }

    public async getAssociatedTokenAccounts(destinations: IMultiSender[]): Promise<ITokenTransfer[]> {
        if (!this.wallet.adapter.publicKey) throw "NO WALLET FOUND";

        const mint = new PublicKey(this.mint);
        const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());
        const transfers: ITokenTransfer[] = [];
        const transaction = new Transaction();

        for (const destination of destinations) {
            const publicKey = new PublicKey(destination.address);
            const associatedToken = getAssociatedTokenAddressSync(mint, publicKey);

            try {
                 await getAccount(this.connection, associatedToken);
            } catch (error) {
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        payer,
                        associatedToken,
                        publicKey,
                        mint
                    )
                );
            }
        }

        if (transaction.instructions.length > 0) {
            const signature = await this.wallet.adapter.sendTransaction(transaction, this.connection);

            // console.log(signature);
        }

        for (const destination of destinations) {
            const publicKey = new PublicKey(destination.address);
            const associatedToken = getAssociatedTokenAddressSync(mint, publicKey);
            await pRetry(async () => {
                const account = await getAccount(this.connection, associatedToken);
                if (!account) throw new Error(`Account not found for address: ${destination.address}`);
                transfers.push({ account, amount: destination.amount });
            }, {
                retries: 10,
                minTimeout: 3000
            });
        }

        return transfers;
    }

}

export default TokenManager;