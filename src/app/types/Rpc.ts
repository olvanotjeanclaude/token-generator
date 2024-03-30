import { Connection } from "@solana/web3.js";

export type RpcMode = "devnet" | "testnet" | "mainnet";

export type RPC = {
    mode: RpcMode,
    url: string,
    connection: Connection
};