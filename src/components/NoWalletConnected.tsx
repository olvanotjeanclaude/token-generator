import { Alert } from '@mui/material'
import React from 'react'

export default function NoWalletConnected({ action }: { action: string }) {
    return (
        <Alert sx={{ my: 3 }} variant="outlined" severity="warning">
            You need to connect to your wallet before you can start to {action}
        </Alert>
    )
}
