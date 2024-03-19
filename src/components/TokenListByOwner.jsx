import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, FormControl, InputLabel, FilledInput, MenuItem, Box, Button } from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';


function TokenListByOwner({ formik }) {
    const [value, setValue] = React.useState("");
    const { connection } = useConnection();
    const { wallet, publicKey } = useWallet();
    const [tokens, setTokens] = useState([]);

    const fethTokens = async () => {
        if(!publicKey) return
        
        const tokens = await AccountManager.getTokens(publicKey);
        setTokens(tokens);
    }

    useEffect(() => {
        if (wallet && wallet.readyState == "Installed") {
            wallet.adapter.addListener("connect", async (publicKey) => {
                await fethTokens();
            })
            wallet.adapter.addListener("disconnect", () => {
                formik.setFieldValue("address", "");
                setValue("");
                setTokens([]);
            })
        }
    }, [wallet, connection])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        formik.setFieldValue("address", newValue);

    };

    return (
        <Box>
            <Autocomplete
                disablePortal
                disabled={tokens.length == 0}
                id="addressList"
                defaultValue=""
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={tokens}
                onChange={handleChange}
                noOptionsText="No address Found"
                renderInput={(params) => <TextField
                    sx={{ width: "100%" }}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    {...params} label="Token Address" />}
            />
            {publicKey && tokens.length == 0 && <Button variant='text' onClick={fethTokens}>Reload</Button>}
        </Box>
    );
}

export default TokenListByOwner;
