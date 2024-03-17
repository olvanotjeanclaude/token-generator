import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Title({ title }: { title: string }) {
    return (
        <Box pb={3}>
            <Typography variant='h5'>{title}</Typography>
        </Box>
    )
}
