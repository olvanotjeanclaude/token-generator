import AccountManager from "@/app/AccountManager";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import useRpc from "./useRpc";

const useTokenListByOwner = (formik: any) => {
    const [value, setValue] = React.useState<null | string>(null);
    const [tokens, setTokens] = useState<string[]>([]);
    const { publicKey, wallet } = useWallet();
    const rpc = useRpc();

    const fetchTokens = async () => {
        if (!publicKey) return;

        const tokens = await AccountManager.getTokens(rpc, publicKey);

        setTokens(tokens);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (publicKey) {
                await fetchTokens();
            }
        };

        fetchData();

        const cleanup = () => {
            setValue(null);
        };

        if (wallet) {
            wallet.adapter.addListener("disconnect", cleanup);
        }

        return () => {
            if (wallet) {
                wallet.adapter.removeListener("disconnect", cleanup);
            }
        };
    }, [wallet, publicKey, fetchTokens]);



    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
        formik.setFieldValue("tokenAddress", newValue);
    };

    return {
        value,
        publicKey,
        tokens,
        handleChange,
        fetchTokens
    };
}

export default useTokenListByOwner;