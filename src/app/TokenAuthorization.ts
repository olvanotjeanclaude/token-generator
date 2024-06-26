import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import { AuthorityType, createSetAuthorityInstruction, setAuthority } from "@solana/spl-token";
import BaseToken from "./BaseToken";
import WalletNotConnectedError from "./error/WalletNotConnectedError";
import Fee from "./enumeration/Fee";
import { RPC } from "./types/RPC";
import Airdrop from "./Airdrop";

class TokenAuthorization extends BaseToken {
    private tokens: PublicKey[] = [];

    constructor(rpc: RPC, wallet: Wallet) {
        super(rpc, wallet);
    }

    public setTokens(tokens: string[] | string) {
        if (Array.isArray(tokens)) {
            this.tokens = tokens.map(token => new PublicKey(token));
        }
        else {
            this.tokens = [new PublicKey(tokens)];
        }
    }

    private async getValidateTokens(): Promise<PublicKey[]> {
        const tokens: PublicKey[] = [];

        for (const token of this.tokens) {
            try {
                const mintInfo = await this.rpc.connection.getAccountInfo(token);
                if (mintInfo) {
                    tokens.push(token);
                }
            } catch (error) {

            }
        }

        return tokens;
    }


    private async revokeAuthority(authorityType: AuthorityType, fee: number, errorMessage: string): Promise<TransactionSignature> {
        if (this.tokens.length == 0) throw "No token provided";

        if (!this.payer) throw new WalletNotConnectedError();

        try {
            const transaction = new Transaction();
            const validatedTokens = await this.getValidateTokens();

            validatedTokens.forEach(token => {
                transaction.add(
                    createSetAuthorityInstruction(
                        token,
                        this.payer as PublicKey,
                        authorityType,
                        null,
                    )
                );

                const feeInstruction = Airdrop.transferInstruction(
                    this.payer as PublicKey,
                    this.walletFee,
                    fee);

                if (feeInstruction) {
                    transaction.add(feeInstruction);
                }
            })

            const signature = await this.wallet.adapter.sendTransaction(transaction, this.rpc.connection);

            return signature;

        } catch (error) {
            console.log(error);
            throw errorMessage;
        }

    }

    public async revokeFreezeAuthority(): Promise<TransactionSignature> {
        // 23.20-23.19
        return this.revokeAuthority(
            AuthorityType.FreezeAccount,
            Fee.RevokeFreezeAuthority,
            "Unable to revoke freeze authority"
        )
    }

    public async revokeMintAuthority(): Promise<TransactionSignature> {
        // 23.19-23.17
        return this.revokeAuthority(
            AuthorityType.MintTokens,
            Fee.RevokeMintAuthority,
            "Unable to revoke mint Authority"
        )
    }

    public async revokeFreezeAndMintAuthority(): Promise<TransactionSignature> {
        if (this.tokens.length == 0) throw "No token provided";
        // 0.10635 SOL (19.63$)- 0.10629 SOL(19.62$) 
        if (!this.payer) throw new WalletNotConnectedError();

        try {
            const transaction = new Transaction();
            const validatedTokens = await this.getValidateTokens();

            validatedTokens.forEach(token => {
                transaction.add(
                    createSetAuthorityInstruction(
                        token,
                        this.payer as PublicKey,
                        AuthorityType.FreezeAccount,
                        null,
                    ),
                    createSetAuthorityInstruction(
                        token,
                        this.payer as PublicKey,
                        AuthorityType.MintTokens,
                        null,
                    )
                );

                const feeInstruction = Airdrop.transferInstruction(
                    this.payer as PublicKey,
                    this.walletFee,
                    Fee.RevokeFreezeAndMintAuthority);

                if (feeInstruction) {
                    transaction.add(feeInstruction);
                }
            })

            const signature = await this.wallet.adapter.sendTransaction(transaction, this.rpc.connection);

            return signature;

        } catch (error) {
            throw "Unable to revoke freeze and mint authority";
        }
    }

    public async transferMintAuthority(token: PublicKey,destination: PublicKey){
        if (!this.payer) throw new WalletNotConnectedError();
        
        const transaction = new Transaction();
       
        try {
            
            transaction.add(
                createSetAuthorityInstruction(
                    token,
                    this.payer as PublicKey,
                    AuthorityType.MintTokens,
                    destination,
                ),
            );
    
            const signature = await this.wallet.adapter.sendTransaction(transaction, this.rpc.connection);
                console.log(signature);
            return signature;
        } catch (error) {
              throw "Unable to transfert mint authority";
        }
    }
}

export default TokenAuthorization;