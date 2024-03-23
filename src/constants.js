import { Connection, clusterApiUrl } from "@solana/web3.js";

export const CLUSTER = "devnet";

export const EXPLORER = "https://solana.fm/address";

export const CLUSTER_URL = CLUSTER === "devnet" ? clusterApiUrl("devnet") : "http://127.0.0.1:8899";

export const connection = new Connection(CLUSTER_URL, "confirmed");


export function logger(signature) {
    console.log(`Transaction Id: ${signature}`);
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=${CLUSTER}`)
}

export function signatureLink(signature) {
    const path = signature.length >=44 ? "tx": "address";
    return `https://explorer.solana.com/${path}/${signature}?cluster=${CLUSTER}`;
}

export const customColor = {
    light:  "rgb(4,25,56)",
    primary: "rgb(0,13,38)"
};      