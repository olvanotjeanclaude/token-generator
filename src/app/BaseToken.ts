import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { RpcMode } from "./types/Rpc";

class BaseToken {
  protected connection: Connection;
  protected wallet: Wallet;
  protected payer: PublicKey | null = null;
  protected walletFee: PublicKey;
  protected rpcMode: RpcMode = "devnet";
  protected rpcUrl = clusterApiUrl("devnet");

  constructor(connectionUrl: string, wallet: Wallet) {
    this.wallet = wallet;
    this.connection = new Connection(connectionUrl,"confirmed");
    this.walletFee = this.settingUpWalletFee();
    this.rpcUrl= connectionUrl;

    if (this.wallet?.adapter?.publicKey) {
      this.payer = this.wallet.adapter.publicKey;
    }

    if(connectionUrl.includes("mainnet")){
      this.rpcMode="mainnet";
    }
  }

  private settingUpWalletFee() {
    const devFee = process.env.NEXT_PUBLIC_WALLET_DEV_FEE as string;
    const mainFee = process.env.NEXT_PUBLIC_WALLET_MAIN_FEE as string;

    this.walletFee = new PublicKey(devFee);


    if (this.rpcMode === "mainnet") {
      this.walletFee = new PublicKey(mainFee);
    }

    return this.walletFee;
  }
}

export default BaseToken;