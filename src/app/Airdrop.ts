import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { RpcMode } from "./types/RPC";

export interface IAirdrop {
    amount: number,
    keypair: Keypair
}

class Airdrop {
    public static async createNewAccountAndFund(connection: Connection, user: Keypair, amount: number, signer: Keypair): Promise<string> {
        if (!user) throw "Please provide the user keypair";

        const publicKey = user.publicKey;

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

        return signature;
    }

    public static async sendMultiple(connection: Connection, wallets: Array<IAirdrop>, signer: Keypair): Promise<void> {
        if (wallets.length == 0) throw "No wallet found!";

        try {
            wallets.forEach(async wallet => {
                await Airdrop.createNewAccountAndFund(connection, wallet.keypair, wallet.amount, signer);
            });
        } catch (error) {
            throw "Unable to send the transaction";
        }
    }


    public static async send(connection: Connection, wallet: IAirdrop) {
        if (!wallet) throw "Wallet invalid";

        const publicKey = wallet.keypair.publicKey;

        return await connection.requestAirdrop(
            publicKey,
            wallet.amount * LAMPORTS_PER_SOL,
        )
            .catch((e) => {
                throw `Unable to aidrop to ${wallet.keypair.publicKey};`
            })
    };

    public static log(cluster: RpcMode, signature: string) {
        console.log(`Transaction Id: ${signature}`);
        console.log(`https://explorer.solana.com/tx/${signature}?cluster=${cluster}`)
    }

}

export default Airdrop;