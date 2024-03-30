import useRpc from '@/hooks/useRpc';
import useRpcContext from '@/hooks/useRpcContext';
import { Button } from '@mui/material';
import React from 'react'

export default function ToggleRpcMode() {
    const { rpcMode, toggleMode } = useRpcContext()

    return (
        <>
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
