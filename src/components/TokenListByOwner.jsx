import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box, Typography, Stack } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';
import CustomCard from './CustomCard';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import CustomSnackbar from './CustomSnackbar';
import MintInfo from './MintInfo';
import { customColor } from '@/constants';

function TokenListByOwner({ formik }) {
    const [value, setValue] = React.useState(null);
    const [tokens, setTokens] = useState([]);
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
            setValue("");
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



    const handleChange = (event, newValue) => {
        setValue(newValue);
        formik.setFieldValue("tokenAddress", newValue);
    };

    return (
        <Stack gap={2}>
            {publicKey && <MintInfo publicKey={value} />}
            <Autocomplete
                disablePortal
                id="addressList"
                size='large'
                value={value}
                getOptionLabel={option => option}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                noOptionsText="No address Found"
                options={tokens}
                onChange={handleChange}
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
