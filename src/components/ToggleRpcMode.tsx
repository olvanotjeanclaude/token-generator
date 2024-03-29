import useMainContext from '@/hooks/useMainContext';
import { Button, Typography } from '@mui/material';
import React from 'react'

export default function ToggleRpcMode() {
    const { rpcMode,rpcUrl, toggleMode } = useMainContext();

    return (
        <>
        {/* <Typography variant='caption'>{rpcUrl}</Typography> */}
        <Button
            color={rpcMode == "devnet" ? "secondary" : "success"}
            title='Toggle Mode'
            onClick={() => toggleMode()}
            variant='contained'>
            {rpcMode}
        </Button>
        </>
    )
}
