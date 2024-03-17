import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    symbol: Yup.string().required('Symbol is required'),
    description: Yup.string().required('Description is required'),
    imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
    website: Yup.string().url('Invalid URL').required('Website URL is required'),
    twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
    telegram: Yup.string().url('Invalid URL').required('Telegram URL is required'),
    discord: Yup.string().url('Invalid URL').required('Discord URL is required'),
});

const initialValues = {
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
};

const MetadataForm = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // Handle form submission here
        },
    });

    return (
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="symbol"
                        name="symbol"
                        label="Symbol"
                        value={formik.values.symbol}
                        onChange={formik.handleChange}
                        error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                        helperText={formik.touched.symbol && formik.errors.symbol}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="imageUrl"
                        name="imageUrl"
                        label="Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                        helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="website"
                        name="website"
                        label="Website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="twitter"
                        name="twitter"
                        label="Twitter"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                        helperText={formik.touched.twitter && formik.errors.twitter}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="telegram"
                        name="telegram"
                        label="Telegram"
                        value={formik.values.telegram}
                        onChange={formik.handleChange}
                        error={formik.touched.telegram && Boolean(formik.errors.telegram)}
                        helperText={formik.touched.telegram && formik.errors.telegram}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="discord"
                        name="discord"
                        label="Discord"
                        value={formik.values.discord}
                        onChange={formik.handleChange}
                        error={formik.touched.discord && Boolean(formik.errors.discord)}
                        helperText={formik.touched.discord && formik.errors.discord}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Metadata
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const MetadataUpdatePage = () => {
    return (
        <Layout title="Update Metadata">
            <Title title='Update Metadata' />
            <CustomCard>
                <MetadataForm />
            </CustomCard>
        </Layout>
    );
};

export default MetadataUpdatePage;
