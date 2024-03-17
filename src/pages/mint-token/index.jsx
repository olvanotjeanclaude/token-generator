import React from 'react';
import { TextField, Button, Stack, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from "@/components/Title";
import CustomCard from '@/components/CustomCard';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  amount: Yup.number().required('Amount is required').min(0, 'Amount must be greater than or equal to 0'),
});

const initialValues = {
  address: '',
  amount: '',
};

const TokenMintForm = () => {
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
      <Stack spacing={2}>
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Amount to Mint"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Mint Tokens
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

const TokenMintPage = () => {
  return (
    <Layout title="Token Minting">
      <Title title="Token Minting" />
      <CustomCard>
        <TokenMintForm />
      </CustomCard>
    </Layout>
  );
};

export default TokenMintPage;
