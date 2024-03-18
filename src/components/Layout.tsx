import { Box, Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import SolanaButton from './SolanaButton';
import Sidebar from './Sidebar';
import Content from './Content';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>
        <SolanaButton/>
        <Box display="flex" py={3} gap={2}>
          <Sidebar />
          <Content>{children}</Content>
        </Box>
      </Container>
    </>
  );
}
