import React, { useEffect, useMemo } from 'react'
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
require("@solana/wallet-adapter-react-ui/styles.css");
import { ThemeProvider, createTheme } from '@mui/material';
import {  WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { customColor } from "../constants";
import { useNProgressRoute } from '@/hooks/useNProgressRoute';
import LayoutContextProvider from '@/context/LayoutContext';
import RpcContextProvider from '@/context/RpcContext';
import ReactGA from 'react-ga';

export default function MyApp({ Component, pageProps }: any) {
    const TRACKING_ID = "G-ZTZX5EFD16"; // OUR_TRACKING_ID
    
    ReactGA.initialize(TRACKING_ID);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: "filled",
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: customColor.second
                    }
                }
            },
            MuiAccordion:{
                styleOverrides:{
                    root:{
                        background: customColor.second
                    }
                }
            }
        }
    });

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], []);


    useNProgressRoute();

    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <ThemeProvider theme={theme}>
            <RpcContextProvider>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletModalProvider>
                        <LayoutContextProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </LayoutContextProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </RpcContextProvider>
        </ThemeProvider>
    )
}
