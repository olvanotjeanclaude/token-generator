import { Keypair } from "@solana/web3.js";
import base58 from "bs58";


export function getKeypairFromPassword(secretKey: string): Keypair {
    const secret = Uint8Array.from(base58.decode(secretKey));

    const keypair = Keypair.fromSecretKey(secret);

    if (keypair) return keypair;

    throw "Unable to decode secret key. Data may be mismatch";
}
