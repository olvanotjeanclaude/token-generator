import WalletGenerator, { TWalletInfo } from '@/app/WalletGenerator';
import CustomCard from '@/components/CustomCard';
import CustomSnackbar from '@/components/CustomSnackbar';
import Layout from '@/components/Layout'
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import Title from '@/components/Title';
import { truncateText } from '@/helper';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import useFormState from '@/hooks/useFormState';
import useRpc from '@/hooks/useRpc';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";

export default function Page() {
    const { isLoading, setIsLoading, response, setResponse } = useFormState();
    const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const { wallet, publicKey } = useWallet();
    const [generatedWallets, setGeneratedWallets] = useState<TWalletInfo[]>([]);
    const rpc = useRpc();

    const formik = useFormik({
        initialValues: {
            numberOfWallets: '',
        },
        validationSchema: Yup.object().shape({
            numberOfWallets: Yup.number()
                .required('Number of wallets is required')
                .integer('Number of wallets must be an integer')
                .min(1, 'Number of wallets must be at least 1')
            // .max(10, 'Number of wallets cannot exceed 10'),
        }),
        onSubmit: async (values) => {
            try {
                if (!publicKey) return alertSnackbar("error", "Wallet not connected");

                setGeneratedWallets([]);
                const walletGenerator = new WalletGenerator(rpc, wallet as Wallet);
                const { generatedWallets, signature } = await walletGenerator.generateWallets(parseInt(values.numberOfWallets));
                setGeneratedWallets(generatedWallets);
                setResponse(signature);

            } catch (error) {
                alertSnackbar("error", error as string);
            }
        },
    });

    return (
        <Layout title="Wallet Generator">
            <Title title='Wallet Generator' />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Stack
                        component="form"
                        alignItems="center"
                        onSubmit={formik.handleSubmit}
                        autoComplete='off'>
                        <TextField
                            type='number'
                            fullWidth
                            id="numberOfWallets"
                            label="Number of Wallets"
                            name="numberOfWallets"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.numberOfWallets}
                            error={formik.touched.numberOfWallets && Boolean(formik.errors.numberOfWallets)}
                            helperText={formik.touched.numberOfWallets && formik.errors.numberOfWallets}
                        />
                        <Box>
                            <LoadingButtonComponent
                                sx={{ mt: 2 }}
                                isLoading={isLoading}
                                color='success'
                                label='Generate Wallet' />
                        </Box>
                    </Stack>

                    <Box mt={5}>
                        {
                            generatedWallets.map((wallet, index) => (
                                <CustomCard p={.5} mt={.5} key={index}>
                                    <Typography color="primary" variant='caption'>
                                        {wallet.publicKey}
                                    </Typography>
                                </CustomCard>
                            ))
                        }
                    </Box>
                </Grid>

                <Grid item xs={12} sm={5}>

                </Grid>
            </Grid>
            <CustomSnackbar
                message={message}
                open={snackbar}
                setOpen={setSnackbar}
            />
        </Layout>
    )
}
