import { Box, Icon, Stack, Typography } from '@mui/material'
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
                <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
                    <Typography fontWeight={500} mt={{ xs: 8, sm: 2 }} mb={3} variant='h4'>
                        Dapp
                    </Typography>
                </Link>


                <Stack gap={.8}>
                    {
                        routes.map(route =>  (
                            <Box
                                display="flex"
                                alignItems="center"
                                p={1}
                                gap={1}
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
                                key={route.path}>
                                <Icon>
                                    {route.icon}
                                </Icon>
                                <Link
                                    onClick={() => setIsSidebarOpen(false)}
                                    key={route.path} style={{
                                         textDecoration: "none", 
                                         width:"100%",
                                         color: "#fff" }}
                                    href={`${route.path}`}>
                                    <Typography
                                        variant='h6'
                                        fontWeight={500}
                                        key={route.path}>

                                        {route.title}
                                    </Typography>
                                </Link>
                            </Box>
                        ))
                    }
                </Stack>
            </Box>
        </Box>
    )
}
