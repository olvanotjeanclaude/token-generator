import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { RPC } from "./types/RPC";

class BaseToken {
  protected wallet: Wallet;
  protected payer: PublicKey | null = null;
  protected walletFee: PublicKey;
  protected rpc: RPC = {
    mode: "devnet",
    url: clusterApiUrl("devnet"),
    connection: new Connection(clusterApiUrl("devnet"))
  };

  constructor(rpc: RPC, wallet: Wallet) {
    this.wallet = wallet;
    this.walletFee = this.settingUpWalletFee();

    if (this.wallet?.adapter?.publicKey) {
      this.payer = this.wallet.adapter.publicKey;
    }

    this.rpc = rpc;
  }

  private settingUpWalletFee() {
    const devFee = process.env.NEXT_PUBLIC_WALLET_DEV_FEE as string;
    const mainFee = process.env.NEXT_PUBLIC_WALLET_MAIN_FEE as string;

    this.walletFee = new PublicKey(devFee);

    if (this.rpc.mode === "mainnet") {
      this.walletFee = new PublicKey(mainFee);
    }

    return this.walletFee;
  }
}

export default BaseToken;