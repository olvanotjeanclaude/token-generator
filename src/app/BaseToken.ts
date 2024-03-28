import { CLUSTER, CLUSTER_URL } from "@/constants";
import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

class BaseToken {
  protected connection: Connection;
  protected wallet: Wallet;
  protected payer: PublicKey | null = null;
  protected walletFee : PublicKey;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
    this.connection = new Connection(CLUSTER_URL);
    this.walletFee = this.settingUpWalletFee();

    if (this.wallet?.adapter?.publicKey) {
      this.payer = this.wallet.adapter.publicKey;
    }
  }

  private settingUpWalletFee(){
    const devFee = process.env.NEXT_PUBLIC_WALLET_DEV_FEE as string;
    const mainFee= process.env.NEXT_PUBLIC_WALLET_MAIN_FEE as string;
   
    this.walletFee = new PublicKey(devFee);

    if(CLUSTER==="mainnet-beta"){
      this.walletFee = new PublicKey(mainFee);
    }
    
    return this.walletFee;
  }
}

export default BaseToken;