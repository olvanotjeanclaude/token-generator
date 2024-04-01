import { Metadata } from 'next';
import React from 'react'
import Layout from '@/components/Layout';
import { Stack } from '@mui/material';
import Pricing from '@/sections/homepage/Pricing';
import Faqs from '@/sections/homepage/Faqs';
import TokenCreator from '@/sections/homepage/TokenCreator';
import SocialMedia from '@/sections/homepage/SocialMedia';

export const metadata: Metadata = {
    title: "Homepage"
};

export default function Page() {
    return (
        <Layout title='Homepage'>
            <Stack spacing={5}>
                <TokenCreator />
                <Pricing />
                <Faqs />
                <SocialMedia />
            </Stack>
        </Layout>)
}
