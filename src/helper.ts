import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { RpcMode } from "./app/types/RPC";


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

export function isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}

export function logger(rpcMode: RpcMode, signature: string) {
    console.log(`Transaction Id: ${signature}`);
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=${rpcMode}`)
}

export function signatureLink(rpcMode: RpcMode, signature: string) {
    const path = signature.length > 44 ? "tx" : "address";
    return `https://explorer.solana.com/${path}/${signature}?cluster=${rpcMode}`;
}

export function generateFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
