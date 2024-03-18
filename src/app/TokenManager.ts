import { CLUSTER_URL } from "@/constants";
import { Account, TOKEN_PROGRAM_ID, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddressSync, getMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";


class TokenManager {
    private mint: PublicKey;
    private connection: Connection;

    constructor(mint: PublicKey) {
        this.mint = mint;
        this.connection = new Connection(CLUSTER_URL);
    }

    public getMintAccount() {
        return getMint(this.connection, this.mint);
    }

    public async getAssociatedTokenAccount(publicKey: PublicKey){
        const tokenAccounts = await this.connection.getTokenAccountsByOwner(this.mint,{
            programId: TOKEN_PROGRAM_ID
        });

        return tokenAccounts
    }
}

export default TokenManager;