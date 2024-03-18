import { CLUSTER, CLUSTER_URL } from "../constants";
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

export interface IAirdrop {
    amount: number,
    keypair: Keypair
}

class Airdrop {
    public static async createNewAccountAndFund(user: Keypair, amount: number, signer: Keypair): Promise<string> {
        if (!user) throw "Please provide the user keypair";

        const publicKey = user.publicKey;

        const connection = new Connection(CLUSTER_URL);

        const account = await connection.getAccountInfo(publicKey);

        const transactions = new Transaction();

        if (account) {
            transactions.add(
                SystemProgram.transfer({
                    fromPubkey: signer.publicKey,
                    toPubkey: user.publicKey,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            );
        }
        else {
            transactions.add(
                SystemProgram.createAccount({
                    fromPubkey: signer.publicKey,
                    newAccountPubkey: publicKey,
                    lamports: amount * LAMPORTS_PER_SOL,
                    space: 0,
                    programId: SystemProgram.programId,
                }));
        }

        const signature = await sendAndConfirmTransaction(connection, transactions, [signer, user]);

        // Airdrop.log(signature);
        //    return `Account ${user.publicKey.toBase58()} created and funded ${amount} SOL successfully. Transaction ID: ${signature}`


        return signature;
    }

    public static async sendMultiple(wallets: Array<IAirdrop>, signer: Keypair): Promise<void> {
        if (wallets.length == 0) throw "No wallet found!";

        try {
            wallets.forEach(async wallet => {
                await Airdrop.createNewAccountAndFund(wallet.keypair, wallet.amount, signer);
            });
        } catch (error) {
            console.log(error);
            throw "Unable to send the transaction";
        }

    }


    public static async send(wallet: IAirdrop) {
        if (!wallet) throw "Wallet invalid";

        const publicKey = wallet.keypair.publicKey;

        // console.log(`airdroping to ${publicKey.toBase58()}...`)

        const connection = new Connection(CLUSTER_URL);

        return await connection.requestAirdrop(
            publicKey,
            wallet.amount * LAMPORTS_PER_SOL,
        ).then(airdropSignature => {
            // Airdrop.log(airdropSignature);
            return airdropSignature;
        })
            .catch((e) => {
                throw `Unable to aidrop to ${wallet.keypair.publicKey};`
            })
    };

    public static log(signature: string) {
        console.log(`Transaction Id: ${signature}`);
        console.log(`https://explorer.solana.com/tx/${signature}?cluster=${CLUSTER}`)
    }

}

export default Airdrop;