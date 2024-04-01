import React from 'react';
import { TextField, Button, Grid, Box, Stack } from '@mui/material';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import MultiSenderForm from '@/sections/token-multisender/MultiSenderForm';
import UploadedAddresses from '@/sections/token-multisender/WalletDestinations';
import CustomSnackbar from '@/components/CustomSnackbar';
import SignatureExplorer from '@/components/SignatureExplorer';
import TokenListByOwner from '@/components/TokenListByOwner';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import useTokenMultiSender from '@/hooks/useTokenMultiSender';
import TokenMultiSenderInstruction from '@/sections/token-multisender/TokenMultiSenderInstruction';

const Page = () => {
   const {
    formik,
    senderCount,
    addSender,
    removeSender,
    response,
    isLoading,
    snackbar,
    setSnackbar,
    message
   } = useTokenMultiSender();

    return (
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <Title title="Token Multi Sender" />

            <Grid container>
                <Grid item xs={12} lg={7}>
                    <TokenListByOwner formik={formik} />

                    <Grid container mt={1.5} spacing={2}>
                        {[...Array(senderCount)].map((_, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={7}>
                                    <TextField
                                        fullWidth

                                        id={`senders[${index}].address`}
                                        name={`senders[${index}].address`}
                                        label={`Destination ${index + 1}`}
                                        value={formik.values.senders[index]?.address || ''}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.senders &&
                                            formik.touched.senders[index] &&
                                            Boolean((formik.errors.senders?.[index] as { address?: string })?.address)
                                        }
                                        helperText={
                                            formik.touched.senders &&
                                            formik.touched.senders[index] &&
                                            (formik.errors.senders?.[index] as { address?: string })?.address
                                        }
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
                                        error={
                                            formik.touched.senders &&
                                            formik.touched.senders[index] &&
                                            Boolean((formik.errors.senders?.[index] as { amount?: string })?.amount)
                                        }
                                        helperText={
                                            formik.touched.senders &&
                                            formik.touched.senders[index] &&
                                            (formik.errors.senders?.[index] as { amount?: string })?.amount
                                        }
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Button sx={{ mt: { md: .5 } }} size='large' variant="contained" color="secondary" onClick={() => removeSender(index)}>
                                        Remove
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>

                    <Box display="flex" justifyContent="center" my={2}>
                        <Button variant="outlined" size='small' color="primary" onClick={addSender}>
                            Add New Row
                        </Button>
                    </Box>

                    <UploadedAddresses formik={formik} />

                    {response && <SignatureExplorer signature={response} />}
                </Grid>

                <Grid item xs={12} lg={5}>
                    <Stack px={3} mt={{ xs: 2, lg: 0 }} spacing={2}>
                        <Stack gap={2} flexWrap="wrap" direction={{ xs: "row", lg: "column" }} justifyContent="center">

                            <Box>
                                <LoadingButtonComponent color='success' label="Start Transfer" isLoading={isLoading} />
                            </Box>
                        </Stack>
                        
                        <MultiSenderForm formik={formik} />

                        <TokenMultiSenderInstruction />
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

Page.getLayout = (page: React.JSX.Element) => {
    return <Layout title="Token Generator">
        {page}
    </Layout>
}

export default Page;
