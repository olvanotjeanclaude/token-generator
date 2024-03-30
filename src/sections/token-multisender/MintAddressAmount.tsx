import { IMultiSender } from '@/app/TokenManager'
import CustomCard from '@/components/CustomCard'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

export default function MintAddressAmount({ addresses }: { addresses: IMultiSender[] }) {
    return (
        <Stack gap={0.5}>
            {addresses?.map((value, key) => (
                <CustomCard p={1} key={key} display="flex" justifyContent="space-between">
                    <Typography color="secondary" variant='caption' style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {value.address}
                    </Typography>
                    <Typography color="secondary" textAlign="end" minWidth={50} mr={2} variant='caption'>
                        {value.amount}
                    </Typography>
                </CustomCard>
            ))}
        </Stack>
    )
}
