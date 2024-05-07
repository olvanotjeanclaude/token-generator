"use client";

import { useFormik } from 'formik';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import TokenAuthorization from '@/app/TokenAuthorization';
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import useRpc from '@/hooks/useRpc';
import CustomSnackbar from '@/components/CustomSnackbar';
import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';

export default function SetAuthority({ tokenAddress }: { tokenAddress: string }) {
    const { wallet } = useWallet();
    const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const [isLoading,setIsLoading] = useState(false);
    const rpc = useRpc();


    const formik = useFormik({
        initialValues: {
            mintAuthority: '',
        },
        onSubmit: async (values) => {
            try {
                setIsLoading(true);

                const tokenAuthorization = new TokenAuthorization(rpc, wallet as Wallet);

                const mint = new PublicKey(tokenAddress);
                const addressDestination = new PublicKey(values.mintAuthority);

                const result = await tokenAuthorization.transferMintAuthority(mint, addressDestination)
              
                alertSnackbar("success", result as string);
             
                formik.resetForm();
            } catch (error) {
                alertSnackbar("error", error as string);
            }
            finally{
                setIsLoading(false);
            }
        },
    });

    return (
        <Card>
            <CardContent>
                <form autoComplete='off' onSubmit={formik.handleSubmit} style={{ padding: "5px" }}>
                    <Typography component="label" htmlFor="mintAuthority">Mint Authority Destination</Typography>
                    <TextField
                        id="mintAuthority"
                        name="mintAuthority"
                        type="text"
                        value={formik.values.mintAuthority}
                        onChange={formik.handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        disabled={!Boolean(tokenAddress)}
                        style={{ marginBottom: "10px" }}
                    />
                     <LoadingButtonComponent label="Transfert Mint Authority" color='secondary'
                      isLoading={isLoading} />
                </form>

            </CardContent>
                <CustomSnackbar
                    open={snackbar}
                    setOpen={setSnackbar}
                    message={message}
                />
        </Card>
    );
}
