import { PublicKey, Transaction, TransactionSignature } from "@solana/web3.js";
import { Wallet } from "@solana/wallet-adapter-react";
import { AuthorityType, createSetAuthorityInstruction } from "@solana/spl-token";
import BaseToken from "./BaseToken";
import WalletNotConnectedError from "./error/WalletNotConnectedError";

class TokenAuthorization extends BaseToken {
    private tokens: PublicKey[] = [];

    constructor(wallet: Wallet) {
        super(wallet);
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
                const mintInfo = await this.connection.getAccountInfo(token);
                if (mintInfo) {
                    tokens.push(token);
                }
            } catch (error) {

            }
        }

        return tokens;
    }


    private async revokeAuthority(authorityType: AuthorityType, errorMessage: string): Promise<TransactionSignature> {
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
            })

            const signature = await this.wallet.adapter.sendTransaction(transaction, this.connection);

            return signature;

        } catch (error) {
            console.log(error);
            throw errorMessage;
        }

    }

    public async revokeFreezeAuthority(): Promise<TransactionSignature> {
        return this.revokeAuthority(
            AuthorityType.FreezeAccount,
            "Unable to revoke freeze authority"
        )
    }

    public async revokeMintAuthority(): Promise<TransactionSignature> {
        return this.revokeAuthority(
            AuthorityType.MintTokens,
            "Unable to revoke mint Authority"
        )
    }

    public async revokeFreezeAndMintAuthority(): Promise<TransactionSignature> {
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
            })

            const signature = await this.wallet.adapter.sendTransaction(transaction, this.connection);

            return signature;

        } catch (error) {
            console.log(error);
            throw "Unable to revoke freeze and mint authority";
        }
    }
}

export default TokenAuthorization;