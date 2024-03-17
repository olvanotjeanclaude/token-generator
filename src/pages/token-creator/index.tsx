import React from 'react';
import { TextField, Button, Grid, Typography, Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  symbol: Yup.string().required('Symbol is required'),
  decimal: Yup.number().required('Decimal is required').positive('Decimal must be a positive number'),
  image: Yup.string().required('Image URL is required'),
  supply: Yup.number().required('Supply is required').positive('Supply must be a positive number'),
  description: Yup.string().required('Description is required'),
  website: Yup.string().url('Invalid URL').required('Website URL is required'),
  twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
  telegram: Yup.string().url('Invalid URL').required('Telegram URL is required'),
  discord: Yup.string().url('Invalid URL').required('Discord URL is required'),
});

const initialValues = {
  name: '',
  symbol: '',
  decimal: '',
  image: '',
  supply: '',
  description: '',
  website: '',
  twitter: '',
  telegram: '',
  discord: '',
};

const Page = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // You can handle form submission here
    },
  });

  return (
    <>
      <Title title="Token Generator" />
      <Stack component="form" autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="decimal"
              name="decimal"
              label="Decimal"
              value={formik.values.decimal}
              onChange={formik.handleChange}
              error={formik.touched.decimal && Boolean(formik.errors.decimal)}
              helperText={formik.touched.decimal && formik.errors.decimal}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="supply"
              name="supply"
              label="Supply"
              value={formik.values.supply}
              onChange={formik.handleChange}
              error={formik.touched.supply && Boolean(formik.errors.supply)}
              helperText={formik.touched.supply && formik.errors.supply}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
        </Grid>
        <Grid container mt={5} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="website"
              name="website"
              label="Website URL"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="twitter"
              name="twitter"
              label="Twitter URL"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              error={formik.touched.twitter && Boolean(formik.errors.twitter)}
              helperText={formik.touched.twitter && formik.errors.twitter}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="telegram"
              name="telegram"
              label="Telegram URL"
              value={formik.values.telegram}
              onChange={formik.handleChange}
              error={formik.touched.telegram && Boolean(formik.errors.telegram)}
              helperText={formik.touched.telegram && formik.errors.telegram}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="discord"
              name="discord"
              label="Discord URL"
              value={formik.values.discord}
              onChange={formik.handleChange}
              error={formik.touched.discord && Boolean(formik.errors.discord)}
              helperText={formik.touched.discord && formik.errors.discord}
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ float: "inline-end" }} variant="contained" color="primary" type="submit">
              Generate Token
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

Page.getLayout = (page: any) => {
  return <Layout title="Token Generator">
    <CustomCard>
      {page}
    </CustomCard>
  </Layout>
}

export default Page;
