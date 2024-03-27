import React from 'react';
import { TextField, Stack, Box, Typography, Grid } from '@mui/material';
import Layout from '@/components/Layout';
import Title from "@/components/Title";
import TokenListByOwner from '@/components/TokenListByOwner';
import CustomSnackbar from '@/components/CustomSnackbar';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import SignatureExplorer from '@/components/SignatureExplorer';
import useTokenMint from '@/hooks/useTokenMint';
import MintInstruction from '@/sections/mint-token/MintInstruction';
import NoWalletConnected from '@/components/NoWalletConnected';

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
            <LoadingButtonComponent label="Mint Token" color='success' isLoading={isLoading} /> :
            <NoWalletConnected action='mint token' />
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <TokenMintForm />
        </Grid>

        <Grid item xs={12} md={5}>
          <MintInstruction />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TokenMintPage;
