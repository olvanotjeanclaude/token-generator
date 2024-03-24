import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Checkbox, Stack, Box, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Props {
    formik: any; // Adjust the type according to your Formik form
}


const TabTokenFromWallet: React.FC<Props> = ({ formik }) => {
    const { wallet, publicKey } = useWallet();
    const [tokens, setTokens] = useState<string[]>([]);
    const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

    const fetchTokens = async () => {
        if (!publicKey) return;
        const tokens = await AccountManager.getTokens(publicKey);
        setTokens(tokens);
        formik.setFieldValue("tokens", selectedTokens);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (wallet && wallet.readyState === "Installed") {
                await fetchTokens();
            }
        };
        if (wallet && wallet.readyState == "Installed") {
            wallet.adapter.addListener("disconnect", () => {
                formik.setFieldValue("tokens", []);
                setSelectedTokens([]);
                setTokens([]);
            })
        }

        fetchData();

        const cleanup = () => {
            setSelectedTokens([]);
            console.log("clean");
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

    const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
        setSelectedTokens(value);
        formik.setFieldValue("tokens", value);
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    
    return (
        <Box mt={2} mb={3} gap={2} >
            <Autocomplete
                // sx={{maxWidth:"100%"}}
                disableCloseOnSelect
                disabled={!publicKey}
                multiple
                noOptionsText="No token found"
                onChange={handleChange}
                options={tokens}
                renderInput={(params) => (
                    <TextField {...params}
                        error={formik.touched.tokens && Boolean(formik.errors.tokens)}
                        helperText={formik.touched.tokens && formik.errors.tokens}
                        {...params}
                    />
                )}
                renderOption={(props, tokenName, { selected }) => (
                    <Typography sx={{overflow:"hidden"}} {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                        />
                        {tokenName}
                    </Typography>
                )}
            />
        </Box>
    );
}

export default TabTokenFromWallet;
