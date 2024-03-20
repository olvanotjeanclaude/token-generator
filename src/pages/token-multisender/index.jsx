import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import MultiSenderForm from '@/pages/token-multisender/(components)/MultiSenderForm';
import UploadedAddresses from './(components)/UploadedAddresses';
import TokenManager from '@/app/TokenManager';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import CustomSnackbar from '@/components/CustomSnackbar';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import useFormState from '@/hooks/useFormState';


const validationSchema = Yup.object().shape({
    senders: Yup.array().of(
        Yup.object().shape({
            address: Yup.string().required('Address is required').matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string'),
            amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
        })
    ),
    tokenAddress: Yup.string()
        .required('Token address is required')
        .matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string')
});

const initialValues = {
    senders: [{ address: '', amount: '' }],
    addresses: [],
    csvAmount: 0,
    tokenAddress: ""
};

const Page = () => {
    const [senderCount, setSenderCount] = useState(1);
    const { wallet, publicKey } = useWallet();
    const { message, setMessage, snackbar, setSnackbar } = useCustomSnackbar();
    const { errors, setErrors, response, setResonse, isLoading, setIsLoading, resetState } = useFormState();


    const addSender = () => {
        setSenderCount(prevCount => prevCount + 1);
        formik.setFieldValue(`senders[${senderCount}]`, { address: '', amount: '' });
    };

    const removeSender = (indexToRemove) => {
        setSenderCount(prevCount => prevCount - 1);
        const updatedSenders = formik.values.senders.filter((_, index) => index !== indexToRemove);
        formik.setFieldValue('senders', updatedSenders);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!publicKey) {
                setMessage({
                    type: "error",
                    text: "Please connect to your phantom wallet"
                });
                setSnackbar(true);
                return;
            }

            resetState()

            setIsLoading(true)

            const data = [
                ...values.senders,
                ...values.addresses.map(address => ({ address, amount: values.csvAmount }))
            ]
                .filter(value => {
                    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

                    return base58Regex.test(value.address);
                })
                .slice(0, 3);

            try {
                const mint = new PublicKey(values.tokenAddress);
                const token = new TokenManager(mint, wallet);

                const res = await token.sendMultiple(data);

                setMessage({
                    type:"success",
                    text:"Transfer successfully"
                })
                setSnackbar(true);
                formik.resetForm()
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error?.message ?? "Error occured"
                });
                setSnackbar(true)
            }
            finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Title title="Token Multi Sender" />

            <Grid container>
                <Grid item xs={12} lg={9}>
                    <TextField
                        fullWidth
                        sx={{ mb: 2 }}
                        id="tokenAddress"
                        // size='small'
                        name="tokenAddress"
                        label="Token Address"
                        value={formik.values.tokenAddress}
                        onChange={formik.handleChange}
                        error={formik.touched.tokenAddress && Boolean(formik.errors.tokenAddress)}
                        helperText={formik.touched.tokenAddress && formik.errors.tokenAddress}
                    />

                    <Grid container spacing={2}>
                        {[...Array(senderCount)].map((_, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={7}>
                                    <TextField
                                        fullWidth
                                        id={`senders[${index}].address`}
                                        name={`senders[${index}].address`}
                                        label={`Destination ${index+1}`}
                                        value={formik.values.senders[index]?.address || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.senders && formik.touched.senders[index] && Boolean(formik.errors.senders?.[index]?.address)}
                                        helperText={formik.touched.senders && formik.touched.senders[index] && formik.errors.senders?.[index]?.address}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        id={`senders[${index}].amount`}
                                        name={`senders[${index}].amount`}
                                        label="Amount"
                                        type="number"
                                        value={formik.values.senders[index]?.amount || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.senders && formik.touched.senders[index] && Boolean(formik.errors.senders?.[index]?.amount)}
                                        helperText={formik.touched.senders && formik.touched.senders[index] && formik.errors.senders?.[index]?.amount}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Button disabled={formik.values.senders.length === 1} sx={{ mt: { md: 1.3 } }} size='large' variant="contained" color="secondary" onClick={() => removeSender(index)}>
                                        Remove
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>

                    <UploadedAddresses formik={formik} addresses={formik.values.addresses} />
                </Grid>

                <Grid item xs={12} lg={3}>
                    <Stack px={3} mt={{ xs: 2, md: 0 }} spacing={2}>
                        <Stack gap={2} direction={{ xs: "row", md: "column" }} justifyContent="center">
                            <Box>
                                <Button variant="contained" color="primary" onClick={addSender}>
                                    Add New Row
                                </Button>
                            </Box>
                            <Box>
                                <LoadingButtonComponent label="Start Transfer" isLoading={isLoading} />
                            </Box>
                        </Stack>
                        <MultiSenderForm formik={formik} />
                    </Stack>
                </Grid>
            </Grid>

            <CustomSnackbar
                open={snackbar}
                setOpen={setSnackbar}
                message={message}
            />
        </form>
    );
};

Page.getLayout = (page) => {
    return <Layout title="Token Generator">
        {page}
    </Layout>
}

export default Page;
