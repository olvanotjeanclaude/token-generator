import CustomCard from '@/components/CustomCard'
import useTokenListByOwner from '@/hooks/useTokenListByOwner'
import { Typography } from '@mui/material'
import React from 'react'

export default function TokensToRevoks({ token }: { token: string }) {
    return (
        <CustomCard p={1} mt={3} display="flex" justifyContent="space-between">
            <Typography color="secondary" variant='caption'>
                -
            </Typography>
            <Typography color="secondary" variant='caption'>
                -
            </Typography>
        </CustomCard>
    )
}
