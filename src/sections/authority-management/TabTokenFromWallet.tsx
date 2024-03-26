import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Checkbox, Stack, Box, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import AccountManager from '@/app/AccountManager';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TokenListByOwner from '@/components/TokenListByOwner';
import useTokenListByOwner from '@/hooks/useTokenListByOwner';
import MintInfo from '@/components/MintInfo';

interface Props {
    formik: any;
}


const TabTokenFromWallet: React.FC<Props> = ({ formik }) => {
    const {
        publicKey,
        tokens,
        value,
        handleChange,
        fetchTokens
    } = useTokenListByOwner(formik);
    return (
        <Box mt={2} mb={3} gap={2} >
            {value && <MintInfo publicKey={value ?? ""} />}

            <Autocomplete
                disablePortal
                id="addressList"
                isOptionEqualToValue={(option, value) => option === value}
                noOptionsText="No address Found"
                options={tokens}
                value={value}
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
        </Box>
    );
}

export default TabTokenFromWallet;
