import CustomCard from '@/components/CustomCard'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

export default function MintAddressAmount({ addresses }) {
    return (
        <Stack overflow="auto" gap={.5}>
            {
                addresses?.map((value, key) => (
                    <CustomCard p={1} key={key} display="flex" justifyContent="space-between">
                        <Typography color="secondary" variant='caption'>
                            {value.address}
                        </Typography>
                        <Typography color="secondary" variant='caption'>
                            {value.amount}
                        </Typography>
                    </CustomCard>
                ))
            }

        </Stack>
    )
}
