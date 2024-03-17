import { Box } from '@mui/material'
import React from 'react'

export default function CustomCard({ children }) {
    return (
        <Box p={3} pb={5} borderRadius={3} bgcolor="rgb(4,25,56)">
            {children}
        </Box>
    )
}
