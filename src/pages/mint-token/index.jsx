import React from 'react';
import { TextField, Button, Stack, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from "@/components/Title";
import CustomCard from '@/components/CustomCard';
import TokenManager from '@/app/TokenManager';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenListByOwner from '@/components/TokenListByOwner';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import CustomSnackbar from '@/components/CustomSnackbar';
import useFormState from '@/hooks/useFormState';
import Errors from '@/components/Errors';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import SignatureExplorer from '@/components/SignatureExplorer';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  amount: Yup.number("Amount must be number").required('Amount is required').min(0, 'Amount must be greater than or equal to 0'),
});


const TokenMintForm = () => {
  const initialValues = {
    address: '',
    amount: '',
  };
  const { wallet, publicKey } = useWallet();
  const { message, setMessage, snackbar, setSnackbar } = useCustomSnackbar();
  const { errors, setErrors, response, setResonse, isLoading, setIsLoading, resetState } = useFormState();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        resetState();

        setIsLoading(true);

        const mint = new PublicKey(values.address);

        const tokenManager = new TokenManager(mint, wallet)

        const signature = await tokenManager.mintTo(publicKey, values.amount);

        if (signature) {
          setMessage({
            text: `Successfully minted ${values.amount} tokens.`,
            type: "success"
          })

          setSnackbar(true);
          setResonse(signature);
          formik.resetForm();
        }
      } catch (error) {
        setErrors([error]);
      }
      finally {
        setIsLoading(false);
      }

    },

  });

  return (
    <Box >
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Errors errors={errors} />

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
