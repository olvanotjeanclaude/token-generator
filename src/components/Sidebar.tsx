import { ButtonBase, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link';
import routes from "@/routes";

export default function Sidebar() {
    return (
        <Stack display={{ xs: "none", sm: "flex" }} gap={1.5} minWidth={185} pr={1}>
            <Typography variant='h4'>
                Home
            </Typography>
            {
                routes.map(route => (
                    <Typography fontWeight={500} key={route.path}>
                        <Link style={{ textDecoration: "none", color: "#fff" }} href={`${route.path}`}>
                            {route.title}
                        </Link>
                    </Typography>
                ))
            }
        </Stack>
    )
}
