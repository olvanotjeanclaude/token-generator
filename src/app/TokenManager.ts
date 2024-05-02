import { Account, createAssociatedTokenAccountInstruction, createMintToInstruction, createTransferInstruction, getAccount, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, getMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Wallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from "@solana/web3.js";
import pRetry from "p-retry";
import BaseToken from "./BaseToken";
import Fee from "./enumeration/Fee";
import AccountManager from "./AccountManager";
import { RPC } from "./types/RPC";
import Airdrop from "./Airdrop";

export interface IMultiSender {
    address: string,
    amount: number
}

interface ITokenTransfer {
    account: Account,
    amount: number
}

class TokenManager extends BaseToken {
    private mint: PublicKey;

    constructor(rpc: RPC, mint: PublicKey, wallet: Wallet) {
        super(rpc, wallet);
        this.mint = mint;
    }


    public getMintAccount() {
        return getMint(this.rpc.connection, this.mint);
    }

    public async getAssociatedTokenAccount(publicKey: PublicKey) {
        if (!this.wallet.adapter.publicKey) throw "NO WALLET";

        const mint = new PublicKey(this.mint);

        const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());

        const associatedToken = getAssociatedTokenAddressSync(
            mint,
            publicKey,
        );

        return await getAccount(this.rpc.connection, associatedToken)
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
                    this.rpc.connection
                );

                return pRetry(async (number) => {
                    console.log(`Retrying ${number} time`)
                    return await getAccount(this.rpc.connection, associatedToken);
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
            this.rpc.connection,
        );

        return signature;
    }

    public async mintTo(rpc: RPC, payer: PublicKey, amount: number) {
        const transaction = new Transaction();
        const fromTokenAccount = await this.getAssociatedTokenAccount(payer);
        const mintInfo = await AccountManager.getMint(rpc, this.mint.toBase58());

        transaction.add(
            createMintToInstruction(
                this.mint,
                fromTokenAccount.address,
                payer,
                amount * Math.pow(10, mintInfo.decimal)
            )
        );

        const feeInstruction = Airdrop.transferInstruction(payer, this.walletFee, Fee.MintToken);
        
        if (feeInstruction) {
            transaction.add(feeInstruction);
        }

        const signature = await this.wallet.adapter.sendTransaction(
            transaction,
            this.rpc.connection,
        ).catch(error => {
            console.log(error);

            throw "We are unable to mint your token.";
        });

        return signature;
    }

    public async sendMultiple(destinations: Array<IMultiSender>): Promise<TransactionSignature> {
        if (!this.mint) throw new Error("Mint not yet created");

        if (!this.wallet.adapter.publicKey) throw "NO WALLET";

        if (destinations.length === 0) throw new Error("No valid destination found");

        const { value: tokenSupply } = await this.rpc.connection.getTokenSupply(this.mint);

        if (!tokenSupply) throw "No value found for the given token";

        try {
            const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());

            const transfers = await this.getAssociatedTokenAccounts(destinations);

            const fromTokenAccount = await this.getAssociatedTokenAccount(payer);

            const transaction = new Transaction();

            for (const transfer of transfers) {
                const toTokenAccount = transfer.account;

                transaction.add(
                    createTransferInstruction(
                        fromTokenAccount.address,
                        toTokenAccount.address,
                        payer,
                        transfer.amount * Math.pow(10, tokenSupply.decimals),
                    ),
                )

                const feeInstruction = Airdrop.transferInstruction(payer, this.walletFee, Fee.MultiSender);

                if (feeInstruction) {
                    transaction.add(feeInstruction);
                }
            }

            const signature = await this.wallet.adapter.sendTransaction(
                transaction,
                this.rpc.connection,
            );

            return signature;
        } catch (error) {
            console.log(error)
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
                await getAccount(this.rpc.connection, associatedToken);
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
            const signature = await this.wallet.adapter.sendTransaction(transaction, this.rpc.connection);

            // console.log(signature);
        }

        for (const destination of destinations) {
            const publicKey = new PublicKey(destination.address);
            const associatedToken = getAssociatedTokenAddressSync(mint, publicKey);
            await pRetry(async () => {
                const account = await getAccount(this.rpc.connection, associatedToken);
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