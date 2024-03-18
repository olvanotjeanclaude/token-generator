import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { Account, createAssociatedTokenAccountInstruction, createMint, getAccount, getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import { CLUSTER_URL } from '@/constants';
import { Wallet } from '@solana/wallet-adapter-react';


class TokenManager {
    private mint: PublicKey;
    private wallet: Wallet;
    private connection: Connection;

    constructor(mint: PublicKey, wallet: Wallet) {
        this.mint = mint;
        this.connection = new Connection(CLUSTER_URL);
        this.wallet = wallet;
    }


    public async getAssociatedTokenAccount(publicKey: PublicKey) {
        const address = getAssociatedTokenAddressSync(this.mint, publicKey);

        return await getAccount(this.connection, address)
            .then(account => account)
            .catch(() => {
                // no account found
                return this.createAssociatedToken(publicKey);
            });
    }


    public async createAssociatedToken(owner: PublicKey) {
        if (!this.wallet.adapter.publicKey) throw "Provide the payer";

        const payer = new PublicKey(this.wallet.adapter.publicKey.toBase58());
        const associatedToken = getAssociatedTokenAddressSync(this.mint, owner);

        const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                payer,
                getAssociatedTokenAddressSync(this.mint, owner),
                owner,
                this.mint,
            )
        );

        this.wallet.adapter.sendTransaction(transaction, this.connection);

        return await getAccount(this.connection, associatedToken);
    }
}

export default TokenManager;