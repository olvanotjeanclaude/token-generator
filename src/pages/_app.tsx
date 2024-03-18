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
import { CLUSTER_URL } from "../constants";

export default function MyApp({ Component, pageProps }: any) {
    const theme = createTheme({
        palette: {
            mode: 'dark', // Set the palette type to 'dark'
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: "filled"
                }
            }
        }
    });

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], []);

    const endpoint = useMemo(() => CLUSTER_URL, [])

    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <ThemeProvider theme={theme}>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        {getLayout(<Component {...pageProps} />)}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    )
}
