import base58 from 'bs58';
import { percentAmount, generateSigner, Umi, KeypairSigner } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {  TransactionSignature } from '@solana/web3.js';
import "@solana/web3.js";
import { CLUSTER_URL } from '@/constants';
import { Wallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import NFTStorage from './NFTStorage';

export interface IMetadata {
    name: string;
    symbol: string;
    image: string;
    description?: string;
    extensions?: {
        website?: string;
        twitter?: string;
        telegram?: string;
        discord?: string;
    };
    tags?: string[];
    creator?: {
        name?: string;
        site?: string;
    };
}

class MintManager {
    private umi: Umi;
    private mint: KeypairSigner;
    private metadata: IMetadata;
    private uri: string | null;

    private wallet: Wallet;

    constructor(wallet: Wallet, metaData: IMetadata) {
        this.umi = createUmi(CLUSTER_URL);
        this.mint = generateSigner(this.umi);
        this.wallet = wallet;
        this.metadata = metaData;
        this.uri = null;

        this.umi.use(walletAdapterIdentity(wallet.adapter));

        this.umi.use(mplCandyMachine());
    }


    async uploadMetadata(imageFile: Blob) {
        const nftStorage = new NFTStorage();

        this.uri = await nftStorage.createAndUploadMetadata(imageFile, this.metadata);

        return this.uri;
    }

    async buildMint(amount: number, decimals: number): Promise<TransactionSignature> {
        try {
            if (!this.uri) throw "Please provide the uri of the json";

            if (!this.mint) throw "Please provide the mint";

            if (!this.metadata.name && !this.metadata.symbol) {
                throw "Please provide the metaname";
            }

            if (amount == 0) throw "Amount must be greater than zero";

            const signature = await createAndMint(this.umi, {
                mint: this.mint,
                authority: this.umi.identity,
                name: this.metadata.name,
                symbol: this.metadata.symbol,
                uri: this.uri,
                sellerFeeBasisPoints: percentAmount(0),
                decimals: decimals,
                amount: amount * Math.pow(10, decimals),
                tokenStandard: TokenStandard.Fungible,
            })
                .sendAndConfirm(this.umi)
                .then(() => { return this.mint.publicKey.toString() })
                .catch(err => {
                    console.log(err);
                    throw "Unable to create and mint. please try again latter";
                });

            return signature
        } catch (error) {
            if(typeof error=="string") throw error;

            throw "Unable to create token. Please try again later";
        }

    }


}

export default MintManager;