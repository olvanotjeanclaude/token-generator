import Layout from '@/components/Layout';
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Homepage"
};

export default function Page() {
    return (
        <Layout title="Homepage">
            <Typography>hello baby</Typography>
        </Layout>
    )
}
