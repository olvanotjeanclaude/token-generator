import { Connection, clusterApiUrl } from "@solana/web3.js";

export const CLUSTER = "devnet";

export const CLUSTER_URL = CLUSTER === "devnet" ? clusterApiUrl("devnet") : "http://127.0.0.1:8899";

export const connection = new Connection(CLUSTER_URL, "confirmed");

export const customColor = {
    light:  "rgb(4,25,56)",
    primary: "rgb(0,13,38)",
    second: "#0B0E17",
    main: "rgb(6,9,18)"
};      

export const config = {
    sidebar: {
        width:250,
        bgActive: "#16181C"
    }
};