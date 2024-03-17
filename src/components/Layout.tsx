import Content from '@/components/Content'
import Sidebar from '@/components/Sidebar'
import { Box, Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

export default function Layout({ children, title }: any) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <Box display="flex" py={3} gap={2}>
                    <Sidebar />
                    <Content>{children}</Content>
                </Box>
            </Container>
        </>

    )
}
