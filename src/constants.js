import { Connection, clusterApiUrl } from "@solana/web3.js";

const clusters = {
    devnet:"devnet",
    testnet:"testnet",
    mainnet:"mainnet-beta",
};

export const CLUSTER = clusters["testnet"];

export const CLUSTER_URL =  clusterApiUrl(CLUSTER) 

export const connection = new Connection(CLUSTER_URL, "confirmed");

export const customColor = {
    light:  "rgb(4,25,56)",
    primary: "rgb(0,13,38)",
    second: "#0B0E17",
    main: "rgb(6,9,18)"
};      

export const config = {
    sidebar: {
        width:270,
        bgActive: "#16181C"
    }
};