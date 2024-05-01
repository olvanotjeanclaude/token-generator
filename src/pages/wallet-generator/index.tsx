import WalletGenerator, { TWalletInfo } from '@/app/WalletGenerator';
import CustomCard from '@/components/CustomCard';
import CustomSnackbar from '@/components/CustomSnackbar';
import Layout from '@/components/Layout'
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import Title from '@/components/Title';
import { getKeypairFromPassword, signatureLink, truncateText } from '@/helper';
import base58 from 'bs58';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import useFormState from '@/hooks/useFormState';
import useRpc from '@/hooks/useRpc';
import { Box, Button, Chip, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import Airdrop from '@/app/Airdrop';
import CsvUploader from '@/sections/wallet-generator/CsvUploader';

export default function Page() {
    const rpc = useRpc();
    const { isLoading, setIsLoading } = useFormState();
    const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const [generatedWallets, setGeneratedWallets] = useState<TWalletInfo[]>([]);

    const formik = useFormik({
        initialValues: {
            amounts: [],
            secretKey: ""
        },
        validationSchema: Yup.object().shape({
            secretKey: Yup.string()
                .required('Enter the secret key of wallet signer'),
            amounts: Yup.array().of(
                Yup.number()
            ).min(1, 'At least one amount is required'),
        }),
        onSubmit: async (values) => {
            try {
                setGeneratedWallets([]);

                setIsLoading(true);

                const wallets = values.amounts.map(amount => {
                    const wallet = Keypair.generate();

                    return {
                        wallet,
                        amount
                    };
                })

                for (const current of wallets) {
                    const generated = {
                        publicKey: current.wallet.publicKey.toBase58(),
                        secretKey: base58.encode(current.wallet.secretKey),
                        amount: current.amount
                    };

                    await Airdrop.createNewAccountAndFund(
                        rpc.connection,
                        current.wallet,
                        current.amount,
                        getKeypairFromPassword(values.secretKey)
                    )

                    setGeneratedWallets(prev => ([generated, ...prev]))
                }

            } catch (err) {
                if (typeof err === 'string') {
                    alertSnackbar("error", err);
                } else if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
                    alertSnackbar("error", err.message);
                } else {
                    alertSnackbar("error", "An unknown error occurred");
                }

            }
            finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <Layout title="Wallet Generator">
            <Title title='Wallet Generator' />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Stack
                        component="form"
                        alignItems="center"
                        gap={2}
                        onSubmit={formik.handleSubmit}
                        autoComplete='off'>
                        <TextField
                            type='text'
                            fullWidth
                            id="secretKey"
                            label="Secret key of wallet signer"
                            name="secretKey"
                            autoComplete="off"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.secretKey}
                            error={formik.touched.secretKey && Boolean(formik.errors.secretKey)}
                            helperText={formik.touched.secretKey && formik.errors.secretKey}
                        />

                        <Box>
                            <LoadingButtonComponent
                                sx={{ mt: 2 }}
                                isLoading={isLoading}
                                color='success'
                                label='Generate Wallet' />
                        </Box>
                    </Stack>

                    {generatedWallets.length > 0 && <Box mt={3} overflow="auto">
                        <pre>
                            {JSON.stringify(generatedWallets)}
                        </pre>
                        {isLoading && <LinearProgress color='success' sx={{ my: 2 }} />}

                        {
                            generatedWallets.map((wallet, index) => (
                                <CustomCard p={.5} mt={.5} key={index}>
                                    <Typography
                                        color="primary"
                                        variant='caption'
                                        component="a"
                                        target="_blank"
                                        fontSize={14}
                                        href={signatureLink(rpc.mode, wallet.publicKey)}
                                        title={signatureLink(rpc.mode, wallet.publicKey)}
                                        sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                        {index + 1} | {truncateText(wallet.publicKey)} <Chip size='small' label={`${wallet.amount} SOL`} />
                                    </Typography>
                                </CustomCard>
                            ))
                        }
                    </Box>}
                </Grid>
                <Grid item xs={12} md={4}>
                    <CsvUploader formik={formik} />
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
