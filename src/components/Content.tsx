import { Box, BoxProps } from '@mui/material'
import React from 'react'

export default function Content({children,...props}:BoxProps) {
  return (
    <Box width="100%" {...props}>
        {children}
    </Box>
  )
}
