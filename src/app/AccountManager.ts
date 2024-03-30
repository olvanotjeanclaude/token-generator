import { AccountLayout, TOKEN_PROGRAM_ID, getMint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { RPC } from "./types/RPC";

export type TMint = {
    freezeAuthority: string | undefined,
    mintAuthority: string | undefined,
    supply: string,
    decimal: number
};

class AccountManager {
    public static async getTokens(rpc: RPC, token: PublicKey): Promise<string[]> {        
        const tokenAccounts = await rpc.connection.getTokenAccountsByOwner(
            token,
            {
                programId: TOKEN_PROGRAM_ID,
            }
        );

        const data = tokenAccounts.value.map(tokenAccount => {
            const accountData = AccountLayout.decode(tokenAccount.account.data);
            return accountData.mint.toBase58();
        })

        return data;
    }

    public static async getMint(rpc: RPC, publicKeyStr: string): Promise<TMint> {
        if (!publicKeyStr) throw "No public key provided";

        try {
            const publicKey = new PublicKey(publicKeyStr);

            const data = await getMint(rpc.connection, publicKey);
            const divisor = BigInt(Math.pow(10, data.decimals));
            const result = data.supply / divisor;

            return {
                freezeAuthority: data.freezeAuthority?.toBase58(),
                mintAuthority: data.mintAuthority?.toBase58(),
                supply: result.toLocaleString(),
                decimal: data.decimals
            };
        } catch (error) {
            throw "The mint does not exist";
        }
    }
}

export default AccountManager;