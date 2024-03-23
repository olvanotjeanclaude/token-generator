import React, { useEffect, useState } from 'react';
import { Autocomplete,  TextField, Checkbox, Stack } from '@mui/material';
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
    }, [wallet,publicKey]);

    const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
        setSelectedTokens(value);
        formik.setFieldValue("tokens", value); 
    };

    const handleReloadTokens = async () => {
        await fetchTokens();
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Stack mt={2} mb={3} gap={2}>
            <Autocomplete
                multiple
                disabled={!publicKey}        
                options={tokens}
                onChange={handleChange}
                disableCloseOnSelect
                value={selectedTokens}
                isOptionEqualToValue={(tokenName, value) => tokenName === value}
                noOptionsText="No address Found"
                onOpen={fetchTokens} 
                renderOption={(props, tokenName, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                        />
                        {tokenName}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Token" />
                )}
            />
        </Stack>
    );
}

export default TabTokenFromWallet;
