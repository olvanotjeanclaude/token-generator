import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import useTokenListByOwner from '@/hooks/useTokenListByOwner';
import MintInfo from '@/components/MintInfo';
import NoWalletConnected from '@/components/NoWalletConnected';

const TabTokenFromWallet = ({ formik }) => {
    const {
        publicKey,
        tokens,
        value,
        handleChange,
        fetchTokens
    } = useTokenListByOwner(formik);
    return (
        <Box mt={2} mb={3} gap={2} >
            {value && <MintInfo mb={2} publicKey={value ?? ""} />}

            {!publicKey  && <NoWalletConnected action='revoke authority' />}

            <Autocomplete
                disablePortal
                id="addressList"
                value={value}
                isOptionEqualToValue={(option, value) => option === value}
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
        </Box>
    );
}

export default TabTokenFromWallet;
