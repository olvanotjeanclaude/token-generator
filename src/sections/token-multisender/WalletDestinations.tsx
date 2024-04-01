import { Box, Typography } from '@mui/material'
import React from 'react'
import MintAddressAmount from './MintAddressAmount';
import { IMultiSender } from '@/app/TokenManager';

export default function UploadedAddresses({ formik }: { formik: any }) {
    const values = formik.values;

    const senders: IMultiSender[] = values.senders.filter((value: IMultiSender) => value.amount > 0 && value.address);
    const addresses: IMultiSender[] = values.addresses.filter((value: IMultiSender) => value.amount > 0 && value.address);

    return (
        senders?.length > 0 || addresses?.length > 0 ?
            <Box mt={5}>
                <Box display="flex" mb={1} flexWrap="wrap" alignItems="center" gap={1}>
                    <Typography variant='subtitle1'>Wallet Destinations:</Typography>
                </Box>


                <MintAddressAmount addresses={senders} />

                <MintAddressAmount addresses={addresses} />
            </Box> :
            <></>
    )
}
