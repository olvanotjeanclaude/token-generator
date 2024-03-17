import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';

const validationSchema = Yup.object().shape({
    senders: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
            address: Yup.string().required('Address is required'),
            amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
        })
    ),
});

const initialValues = {
    senders: [{ name: '', address: '', amount: '' }],
};

const Page = () => {
    const [senderCount, setSenderCount] = useState(1);

    const addSender = () => {
        setSenderCount(prevCount => prevCount + 1);
        formik.setFieldValue(`senders[${senderCount}]`, { name: '', address: '', amount: '' });
    };

    const removeSender = (indexToRemove) => {
        setSenderCount(prevCount => prevCount - 1);
        const updatedSenders = formik.values.senders.filter((_, index) => index !== indexToRemove);
        formik.setFieldValue('senders', updatedSenders);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // Handle form submission here
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Title title="Token Multi Sender" />

            <Grid container>
                <Grid item xs={12} lg={9}>
                    <Grid container spacing={2}>
                        {[...Array(senderCount)].map((_, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={7}>
                                    <TextField
                                        fullWidth
                                        id={`senders[${index}].name`}
                                        name={`senders[${index}].name`}
                                        label="Name"
                                        value={formik.values.senders[index]?.name || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.senders && formik.touched.senders[index] && Boolean(formik.errors.senders?.[index]?.name)}
                                        helperText={formik.touched.senders && formik.touched.senders[index] && formik.errors.senders?.[index]?.name}
                                    />
                                </Grid>
                                <Grid item xs={12} md={5}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id={`senders[${index}].address`}
                                        name={`senders[${index}].address`}
                                        label="Address"
                                        value={formik.values.senders[index]?.address || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.senders && formik.touched.senders[index] && Boolean(formik.errors.senders?.[index]?.address)}
                                        helperText={formik.touched.senders && formik.touched.senders[index] && formik.errors.senders?.[index]?.address}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button sx={{ float: "right" }} variant="contained" color="secondary" onClick={() => removeSender(index)}>
                                        Remove
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Stack px={3} spacing={2}>
                        <Button variant="contained" color="primary" onClick={addSender}>
                            Add New Row
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Start Airdrop
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

        </form>
    );
};

Page.getLayout = (page) => {
    return <Layout title="Token Generator">
            {page}
    </Layout>
}

export default Page;
