import AccountManager from "@/app/AccountManager";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { SyntheticEvent, useEffect, useState } from "react";

const useTokenListByOwner = ({ formik }: { formik: any }) => {
    const [value, setValue] = React.useState<null | string>();
    const [tokens, setTokens] = useState<string[]>([]);
    const { publicKey, wallet } = useWallet();

    const fetchTokens = async () => {
        if (!publicKey) return;

        const tokens = await AccountManager.getTokens(publicKey);

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
    }, [wallet, publicKey]);



    const handleChange = (event:  SyntheticEvent<Element, Event>, newValue: string) => {
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