import { Button, ButtonProps } from '@mui/material';
import React from 'react';

type TButton  = {
    isLoading: boolean;
    label: string;
};

type ExtendedButtonProps = TButton & Omit<ButtonProps, keyof TButton>;

export default function LoadingButtonComponent({ isLoading, label,...props }: ExtendedButtonProps) {
    return (
        <Button  disabled={isLoading}  variant="contained" {...props}  type="submit">
            {isLoading ? "saving..." : label}
        </Button>
    );
}
