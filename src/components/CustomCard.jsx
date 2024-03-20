import { Box } from '@mui/material'
import React from 'react'

export default function CustomCard({ children }) {
    return (
        <Box bgcolor="#17233A">
            {children}
        </Box>
    )
}
