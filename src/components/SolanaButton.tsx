import useRpc from '@/hooks/useRpc';
import { Box } from '@mui/material'
import {  useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

export default function SolanaButton() {
    const { publicKey, wallet, connected } = useWallet();
    const [balance, setBalance] = useState(0);
    const { connection } = useRpc();

    const WalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    useEffect(() => {
        if (!connection || !publicKey) return;
        
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
    }, [connection, publicKey, wallet]);

    return (
        <WalletMultiButtonDynamic style={{
            padding:"10px",
            fontSize:"14px"
        }} />
    )
}
