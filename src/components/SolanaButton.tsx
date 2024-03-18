import { Box, Typography } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

export default function SolanaButton() {
    const { connection } = useConnection();
    const { publicKey, wallet, connected } = useWallet();
    const [balance, setBalance] = useState(0);

    const WalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    useEffect(() => {
        if (!connection || !publicKey) {

            return;
        }

        connection.onAccountChange(
            publicKey,
            (updatedAccountInfo) => {
                setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
            },
            "confirmed",
        );

        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info?.lamports ?? 0);
        });
    }, [connection, publicKey,wallet]);

    return (
        <Box display="flex" alignItems="center" gap={2} justifyContent="end">
            <Typography>
                {publicKey && connected ? `Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL` : ""}
            </Typography>
            <WalletMultiButtonDynamic />
        </Box>
    )
}
