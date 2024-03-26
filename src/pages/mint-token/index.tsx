import React from 'react';
import { TextField,  Stack, Box, Typography } from '@mui/material';
import Layout from '@/components/Layout';
import Title from "@/components/Title";
import TokenListByOwner from '@/components/TokenListByOwner';
import CustomSnackbar from '@/components/CustomSnackbar';
import Errors from '@/components/Errors';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import SignatureExplorer from '@/components/SignatureExplorer';
import CustomCard from '@/components/CustomCard';
import useTokenMint from '@/hooks/useTokenMint';

const TokenMintForm = () => {
  const {
    publicKey,
    isLoading,
    response,
    formik,
    errors,
    snackbar,
    setSnackbar,
    message
  } = useTokenMint();
  return (
    <Box >
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          {/* <Errors errors={errors} /> */}

          <TokenListByOwner formik={formik} />

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
        </Stack>
        <Box display="flex" mt={3} mb={6} justifyContent="center">
          {publicKey ?
            <LoadingButtonComponent label="Mint Token" isLoading={isLoading} /> :
            <Typography>Before you can mint, first select your wallet please !</Typography>
          }
        </Box>

        {response && <SignatureExplorer signature={response} />}
      </form>

      <CustomSnackbar
        open={snackbar}
        setOpen={setSnackbar}
        message={message}
      />
    </Box>
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
