import { Alert, Box, Typography } from '@mui/material'
import React from 'react'

export default function Errors({ errors }: { errors: string }) {

    return (
        errors ?
            <Box>
                <Alert variant='outlined' severity="error">
                    <Typography>{errors}</Typography>
                </Alert>

            </Box> :
            <></>
    )
}
