import { signatureLink } from '@/constants'
import { Box, Link, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

export default function SignatureExplorer({ signature }) {
    return (
        <Box display="flex" gap={1}   overflow="hidden">
            <Typography>Signature:</Typography>
            <Typography
                fontSize={14}
                target='_blank'
                alignItems="center"
                sx={{ textDecoration: "none" }}
                textOverflow="ellipsis"
                color={green[500]}
                component="a"
                href={signatureLink(signature)}>{signature}</Typography>
        </Box>
    )
}
