import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { CLUSTER } from "./constants";


export function getKeypairFromPassword(secretKey: string): Keypair {
    const secret = Uint8Array.from(base58.decode(secretKey));

    const keypair = Keypair.fromSecretKey(secret);

    if (keypair) return keypair;

    throw "Unable to decode secret key. Data may be mismatch";
}

export const truncateText = (text: string, maxLength: number = 50) => {
    if (typeof text !== "string") return;

    if (text.length <= maxLength) return text;

    const firstPartLength = Math.floor(maxLength / 2);
    const lastPartLength = Math.ceil(maxLength / 2);

    const firstPart = text.substring(0, firstPartLength);
    const lastPart = text.substring(text.length - lastPartLength);

    return `${firstPart}...${lastPart}`;
};

export function isNumeric(value: string ): boolean {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}  

export function logger(signature:string) {
    console.log(`Transaction Id: ${signature}`);
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=${CLUSTER}`)
}

export function signatureLink(signature:string) {
    const path = signature.length >44 ? "tx": "address";
    return `https://explorer.solana.com/${path}/${signature}?cluster=${CLUSTER}`;
}