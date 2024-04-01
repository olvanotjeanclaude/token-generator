import { percentAmount, generateSigner, Umi, KeypairSigner, publicKey, createAmount, sol } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import "@solana/web3.js";
import { Wallet } from '@solana/wallet-adapter-react';
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import NFTStorage from './NFTStorage';
import { transferSol, mplToolbox } from '@metaplex-foundation/mpl-toolbox';
import Fee from './enumeration/Fee';
import BaseToken from './BaseToken';
import { RPC } from './types/RPC';
import Airdrop from './Airdrop';


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

class MintManager extends BaseToken {
    private umi: Umi;
    private mint: KeypairSigner;
    private metadata: IMetadata;
    private uri: string | null;

    constructor(rpc: RPC, wallet: Wallet, metaData: IMetadata) {
        super(rpc, wallet);

        this.umi = createUmi(this.rpc.url);
        this.mint = generateSigner(this.umi);
        this.metadata = metaData;
        this.uri = null;

        this.umi.use(walletAdapterIdentity(wallet.adapter));
        this.umi.use(mplCandyMachine());
        this.umi.use(mplToolbox());
    }


    async uploadMetadata(imageFile: Blob) {
        const nftStorage = new NFTStorage();

        this.uri = await nftStorage.createAndUploadMetadata(imageFile, this.metadata);

        return this.uri;
    }

    async buildMint(amount: number, decimals: number): Promise<TransactionSignature> {
        try {
            if (!this.wallet.adapter.publicKey) throw "NO WALLET";

            if (!this.uri) throw "Please provide the uri of the json";

            if (!this.mint) throw "Please provide the mint";

            if (!this.metadata.name && !this.metadata.symbol) throw "Please provide the metaname";

            if (amount == 0) throw "Amount must be greater than zero";

            const transaction = createAndMint(this.umi, {
                mint: this.mint,
                authority: this.umi.identity,
                name: this.metadata.name,
                symbol: this.metadata.symbol,
                uri: this.uri,
                sellerFeeBasisPoints: percentAmount(0),
                decimals: decimals,
                amount: amount * Math.pow(10, decimals),
                tokenStandard: TokenStandard.Fungible,
            });

            if(Airdrop.shouldPayFee(this.wallet.adapter.publicKey)){
                transaction.add(transferSol(this.umi, {
                    destination: publicKey(this.walletFee.toBase58() as string),
                    amount: sol(LAMPORTS_PER_SOL * Fee.TokenCreator)
                }));
            }
                
            const signature= await transaction .sendAndConfirm(this.umi)
                .then(() => { return this.mint.publicKey.toString() })
                .catch(err => {
                    throw "Unable to create and mint. please try again latter";
                });

            return signature
        } catch (error) {
            if (typeof error == "string") throw error;

            throw "Unable to create token. Please try again later";
        }

    }


}

export default MintManager;