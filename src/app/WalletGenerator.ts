import base58 from 'bs58';
import { Wallet } from "@solana/wallet-adapter-react";
import BaseToken from "./BaseToken";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { generateFileName } from '@/helper';
import { RPC } from './types/RPC';

export type TWalletInfo = {
    publicKey: string,
    secretKey: string
};

class WalletGenerator extends BaseToken {
    constructor(rpc:RPC, wallet: Wallet) {
        super(rpc, wallet);
    }

    public async generateWallets(count: number) {
        if (count == 0) throw "Number of wallet  must be greater than 0";

        if (!this.payer) throw "Wallet not connected";

        try {
            const wallets = Array.from({ length: count }).map(() => Keypair.generate());
            const generatedWallets: TWalletInfo[] = [];

            const transactions = new Transaction();

            for (const wallet of wallets) {
                generatedWallets.push({
                    publicKey: wallet.publicKey.toBase58(),
                    secretKey: base58.encode(wallet.secretKey)
                });

                transactions.add(
                    SystemProgram.createAccount({
                        fromPubkey: this.payer,
                        newAccountPubkey: wallet.publicKey,
                        lamports: 0,
                        space: 0,
                        programId: SystemProgram.programId,
                    })
                )
            }

            const signature = await this.wallet.adapter.sendTransaction(
                transactions,
                this.rpc.connection,
                {
                    signers: wallets
                });

            return {
                signature,
                generatedWallets
            };
        } catch (error) {
            throw "Unable to generate wallet";
        }
    }

    public downloadJson(jsonData: object) {
        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

        const url = window.URL.createObjectURL(jsonBlob);

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${generateFileName()}.json`);

        document.body.appendChild(link);

        link.click();

        URL.revokeObjectURL(url);

        document.body.removeChild(link);
    }
}

export default WalletGenerator;