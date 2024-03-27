import { Box, BoxProps } from '@mui/material'
import React from 'react'

export default function Wrapper({ children, ...props }: BoxProps) {
  return (
    <Box px={1.8} {...props}>
      {children}
    </Box>
  )
}
