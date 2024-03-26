import { Box, BoxProps } from '@mui/material'
import React from 'react'


export default function CustomCard({ children, ...props }: BoxProps) {
    return (
        <Box bgcolor="#0B0E17" padding={2} borderRadius={3} {...props}>
            {children}
        </Box>
    )
}
