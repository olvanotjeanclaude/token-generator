import { CLUSTER_URL } from "@/constants";
import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

class BaseToken {
  protected connection: Connection;
  protected wallet: Wallet;
  protected payer: PublicKey | null = null;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
    this.connection = new Connection(CLUSTER_URL);

    if (this.wallet?.adapter?.publicKey) {
      this.payer = this.wallet.adapter.publicKey;
    }
  }
}

export default BaseToken;