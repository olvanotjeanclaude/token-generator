import { CLUSTER_URL } from "@/constants";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

class AccountManager {

    public static async getTokens(user: PublicKey) {
        const connection = new Connection(CLUSTER_URL);
        const tokenAccounts = await connection.getTokenAccountsByOwner(
            user,
            {
                programId: TOKEN_PROGRAM_ID,
            }
        );
        
        const data = tokenAccounts.value.map(tokenAccount =>{
                const accountData = AccountLayout.decode(tokenAccount.account.data);
                const mint = `${(accountData.mint)}`;
    
                return mint;
        })

        return data;
    }
}

export default AccountManager;