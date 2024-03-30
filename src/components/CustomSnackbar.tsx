import { Alert, Button, Snackbar } from '@mui/material'
import React from 'react'

interface ICustomSnackbar {
    open: boolean,
    setOpen: Function,
    message: { type: 'success' | 'info' | 'warning' | 'error', text: string }
}

export default function CustomSnackbar({
    open,
    setOpen,
    message
}: ICustomSnackbar) {

    if (!message.type && !message.text) return <></>;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity={message.type}
                variant="filled"
                sx={{ width: '100%', color: "#fff" }}
            >
                {typeof message.text=="string" ? message.text:"Unexpected error"}
            </Alert>
        </Snackbar>

    )
}
