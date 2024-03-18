import { Alert, AlertColor, Button, Snackbar } from '@mui/material'
import React from 'react'

interface ICustomSnackbar {
    open: boolean,
    setOpen: Function,
    message: { type: AlertColor, text: string }
}

export default function CustomSnackbar({
    open,
    setOpen,
    message
}: ICustomSnackbar) {
    return (

        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity={message.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message.text}
            </Alert>
        </Snackbar>

    )
}
