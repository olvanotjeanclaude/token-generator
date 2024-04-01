import base58 from 'bs58';
import { Wallet } from "@solana/wallet-adapter-react";
import BaseToken from "./BaseToken";
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { generateFileName, getKeypairFromPassword } from '@/helper';
import { RPC } from './types/RPC';
import Airdrop from './Airdrop';

export type TWalletInfo = {
    publicKey: string,
    secretKey: string,
    amount: number
};

class WalletGenerator extends BaseToken {
    constructor(rpc:RPC, wallet: Wallet) {
        super(rpc, wallet);
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