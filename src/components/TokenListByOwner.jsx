import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';

function TokenListByOwner({ formik }) {
    const [value, setValue] = React.useState("");
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
        formik.setFieldValue("address", newValue);
    };

    return (
        <Box>
            <Autocomplete
                disablePortal
                id="addressList"
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="No address Found"
                options={tokens}
                onChange={handleChange}
                onOpen={fetchTokens}
                disabled={!publicKey}
                renderInput={(params) => (
                    <TextField
                        sx={{ width: "100%" }}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        {...params}
                        label="Token Address"
                    />
                )}
            />
        </Box>
    );
}

export default TokenListByOwner;
