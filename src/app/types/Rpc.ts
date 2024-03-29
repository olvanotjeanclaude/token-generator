export type RpcMode = "devnet" | "testnet" | "mainnet";

export type TRpc = {
    rpcMode: RpcMode,
    rpcUrl: string
};