import MainLayout from '@/components/Layout'
import React, { Component } from 'react'
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material';


export default function MyApp({ Component, pageProps }: any) {
    const theme = createTheme({
        palette: {
            mode: 'dark', // Set the palette type to 'dark'
        }
    });

    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <ThemeProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    )
}
