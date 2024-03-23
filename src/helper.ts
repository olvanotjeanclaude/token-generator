import { Keypair } from "@solana/web3.js";
import base58 from "bs58";


export function getKeypairFromPassword(secretKey: string): Keypair {
    const secret = Uint8Array.from(base58.decode(secretKey));

    const keypair = Keypair.fromSecretKey(secret);

    if (keypair) return keypair;

    throw "Unable to decode secret key. Data may be mismatch";
}

export const truncateText = (text: string, maxLength: number=50) => {
    if (text.length <= maxLength) {
        return text;
    }

    const firstPartLength = Math.floor(maxLength / 2);
    const lastPartLength = Math.ceil(maxLength / 2);

    const firstPart = text.substring(0, firstPartLength);
    const lastPart = text.substring(text.length - lastPartLength);

    return `${firstPart}...${lastPart}`;
};