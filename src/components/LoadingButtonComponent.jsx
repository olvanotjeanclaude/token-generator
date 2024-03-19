import { Button } from '@mui/material'
import React from 'react'

export default function LoadingButtonComponent({ isLoading, label,...props }) {
    return (
        <Button disabled={isLoading} variant="contained" {...props} color="primary" type="submit">
            {isLoading ? "saving..." : label}
        </Button>
    )
}
