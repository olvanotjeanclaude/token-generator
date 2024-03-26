import CustomCard from '@/components/CustomCard';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
import { FormikProps } from 'formik';
import React from 'react'
import MintAddressAmount from './MintAddressAmount';

export default function UploadedAddresses({ formik, addresses }) {
    if (addresses.length == 0) return <></>;

    return (
        <Box mt={5}>
            <Box display="flex" mb={1} flexWrap="wrap" alignItems="center" gap={1}>
                <Typography variant='subtitle1'>Wallet Destinations:</Typography>
            </Box>


           <MintAddressAmount addresses={addresses} />
        </Box>
    )
}
