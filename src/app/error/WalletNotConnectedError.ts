class WalletNotConnectedError extends Error {
  static MESSAGE = "Wallet not connected";

  constructor(message: string = WalletNotConnectedError.MESSAGE) {
    super(message);
    this.name = 'WalletNotConnectedError';
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, WalletNotConnectedError.prototype);
  }

  toString() {
    return this.message;
  }
}

export default WalletNotConnectedError;