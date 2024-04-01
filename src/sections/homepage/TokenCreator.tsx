import { Button,  Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Title from './Title'

export default function TokenCreator() {
    return (
        <center>
            <Stack gap={1} maxWidth="md"  alignItems="center">
                <Title title='Create Your Own Token' />
                <Typography textAlign="center" fontSize="1.33rem">
                    Empower your projects with your own custom token. With Token Creator, you can easily generate tokens tailored to your specific needs.
                </Typography>
                <Link href="/token-creator" style={{ textDecoration: "none" }}>
                    <Button variant='contained' color='success' sx={{ mt: 1 }}>
                        Create Token
                    </Button>
                </Link>
            </Stack>
        </center>
    )
}
