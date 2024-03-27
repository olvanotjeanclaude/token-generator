import { Box, Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import SolanaButton from './SolanaButton';
import Content from './Content';
import Header from './Header';
import { config } from '@/constants';
import Sidebar from './Sidebar';

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



      {/* <Header /> */}



      <Box>
        <Box display="flex">
          <Sidebar />
          <Content
           maxWidth="1080px"
            // position="relative"
            ml={{ sm: `${config.sidebar.width}px` }}>
            <Header />
            <Box  p={1.8} mt={1}>
              {children}
            </Box>
          </Content>
        </Box>
      </Box>
    </>
  );
}
