import { Box } from '@mui/material'
import React from 'react'

export default function Content({children}:any) {
  return (
    <Box  width="100%">
        {children}
    </Box>
  )
}
