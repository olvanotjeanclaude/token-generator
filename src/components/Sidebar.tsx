import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link';
import routes from "@/routes";
import { config, customColor } from '@/constants';
import { useRouter } from 'next/router';
import useLayoutContext from '@/hooks/useLayoutContext';

export default function Sidebar() {
    const router = useRouter();
    const { query } = router;
    const { sidebar } = config;

    const { isSidebarOpen, setIsSidebarOpen } = useLayoutContext();

    return (
        <Box
            display={{ xs: isSidebarOpen ? "block" : "none", sm: "block" }}
            zIndex={1000}
            bgcolor={customColor.second}
            position="fixed"
            minHeight="100dvh"
            width={`${sidebar.width}px`}
        >
            <Box p={1.8}>
                <Typography mb={4} variant='h4'>
                    Home
                </Typography>
                
                
                <Stack gap={.8}>
                    {
                        routes.map(route =>query.show === 'true' || route.path !== '/wallet-generator' ?(
                            <Link
                                onClick={() => setIsSidebarOpen(false)}
                                key={route.path} style={{ textDecoration: "none", color: "#fff" }}
                                href={`${route.path}`}>
                                <Typography
                                    variant='body1'
                                    p={1}
                                    borderRadius={3}
                                    sx={{
                                        ...(
                                            router.pathname == route.path ?
                                                {
                                                    background: sidebar.bgActive
                                                } :
                                                {

                                                }),
                                        transition: 'background-color 0.1s', // Smooth transition for hover effect
                                        '&:hover': {
                                            backgroundColor: `${sidebar.bgActive}`,
                                        },
                                    }}
                                    fontWeight={500}
                                    key={route.path}>

                                    {route.title}
                                </Typography>
                            </Link>
                        ):null)
                    }
                </Stack>
            </Box>
        </Box>
    )
}
