import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';;
import MintInfo from './MintInfo';
import useRpc from '@/hooks/useRpc';

function TokenListByOwner({ formik }: { formik: any }) {
    const [value, setValue] = React.useState<null | string>(null);
    const [tokens, setTokens] = useState<string[]>([]);
    const { publicKey, wallet } = useWallet();
    const { rpcUrl } = useRpc();

    const fetchTokens = async () => {
        if (!publicKey) return;

        const tokens = await AccountManager.getTokens(rpcUrl, publicKey);

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



    return (
        <Stack gap={2}>
            {publicKey && value && <MintInfo publicKey={value} />}
            <Autocomplete
                disablePortal
                id="addressList"
                value={value}
                getOptionLabel={option => option}
                isOptionEqualToValue={(option, value) => option === value}
                noOptionsText="No address Found"
                options={tokens}
                onChange={(e,newValue) => {
                    setValue(newValue);
                    formik.setFieldValue("tokenAddress", newValue);
                }}
                onOpen={fetchTokens}
                disabled={!publicKey}
                renderInput={(params) => (
                    <TextField
                        sx={{ width: "100%" }}
                        error={formik.touched.tokenAddress && Boolean(formik.errors.tokenAddress)}
                        helperText={formik.touched.tokenAddress && formik.errors.tokenAddress}
                        {...params}
                        label="Token Address"
                    />
                )}
            />


        </Stack>
    );
}

export default TokenListByOwner;
