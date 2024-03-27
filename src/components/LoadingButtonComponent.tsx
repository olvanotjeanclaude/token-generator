import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

type TButton = {
    isLoading: boolean;
    label: string;
};

type ExtendedButtonProps = TButton & Omit<ButtonProps, keyof TButton>;

export default function LoadingButtonComponent({ isLoading, label, ...props }: ExtendedButtonProps) {
    return (
        <Button disabled={isLoading} variant="contained" {...props} type="submit">
            {isLoading ? "Processing..." : label}
            {isLoading && <CircularProgress color="inherit"  sx={{ ml: 1 }} size={20} />}
        </Button>
    );
}
