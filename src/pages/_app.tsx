import React, { useMemo } from 'react'
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
require("@solana/wallet-adapter-react-ui/styles.css");
import { ThemeProvider, createTheme } from '@mui/material';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { customColor } from "../constants";
import { useNProgressRoute } from '@/hooks/useNProgressRoute';
import LayoutContextProvider from '@/context/LayoutContext';
import MainContextProvider from '@/context/MainContext';
import useRpc from '@/hooks/useRpc';

export default function MyApp({ Component, pageProps }: any) {
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
        }
    });

    const { rpcUrl } = useRpc();

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], []);


    useNProgressRoute();

    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <ThemeProvider theme={theme}>
            <ConnectionProvider endpoint={rpcUrl}>
                <WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        <MainContextProvider>
                            <LayoutContextProvider>
                                {getLayout(<Component {...pageProps} />)}
                            </LayoutContextProvider>
                        </MainContextProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    )
}
