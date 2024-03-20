import CustomCard from '@/components/CustomCard';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
import { FormikProps } from 'formik';
import React from 'react'

export default function UploadedAddresses({ formik, addresses }) {
    if (addresses.length == 0) return <></>;

    return (
        <Box mb={2} mt={5}>
            <Box display="flex" mb={2} flexWrap="wrap" alignItems="center" gap={1}>
                <Typography variant='subtitle1'>List of Wallet Addresses:</Typography>
                <TextField
                    id="csvAmount"
                    size='small'
                    name="csvAmount"
                    label="Amount For CSV"
                    type="number"
                    value={formik.values.csvAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.csvAmount && Boolean(formik.errors.csvAmount)}
                    helperText={formik.touched.csvAmount && formik.errors.csvAmount}
                />
            </Box>


            <CustomCard>
                <Stack height={200} overflow="auto" border="1px solid grey">
                    <ul>
                        {
                            addresses?.map((value, key) => (
                                <li style={{ padding: 8 }} key={key}><Typography variant='body2'>{value}</Typography></li>
                            ))
                        }
                    </ul>
                </Stack>
            </CustomCard>
        </Box>
    )
}
