import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Title({ title }: { title: string }) {
    return (
        <Box pb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant='h5'>{title}</Typography>
        </Box>
    )
}
