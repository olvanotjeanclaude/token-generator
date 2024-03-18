import React, { useCallback, useState } from 'react';
import { TextField, Button, Grid, Typography, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';
import DropzoneForm from '@/components/DropzoneForm';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import CustomSnackbar from '@/components/CustomSnackbar';
import MintManager from '@/app/MintManger';
import { green } from '@mui/material/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  symbol: Yup.string().required('Symbol is required').max(5, "The symbol must be less than 5"),
  decimal: Yup.number().required('Decimal is required').max(10, "Cannot be more than 10").positive('Decimal must be a positive number'),
  file: Yup.string().required('File is required'),
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
  supply: '',
  description: '',
  website: '',
  twitter: '',
  telegram: '',
  discord: '',
  file: null
};


const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({
    type: null,
    text: null
  });
  const [snackbar, setSnackbar] = useState(false);
  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();
  const [mint, setMint] = useState("");

  const handleSubmit = useCallback(async (values) => {
    try {
      if (!publicKey) {
        setMessage({
          type: "error",
          text: "Please connect to your phantom wallet"
        });
        setSnackbar(true);
        return;
      }

      setIsLoading(true);

      const metadata = {
        name: values.name,
        symbol: values.symbol,
        description: values.description,
        extensions: {
          twitter: values.twitter,
          telegram: values.telegram,
          discord: values.discord,
        }
      };

      const mintManager = new MintManager(wallet, metadata);

      await mintManager.uploadMetadata(values.file);

      const mint = await mintManager.buildMint(values.supply, values.decimal);

      setMessage({
        type: "success",
        text: "Token generated successfully"
      });
      setMint(mint);
      setSnackbar(true);
      formik.resetForm();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, wallet, connection]);


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      // Check if a file is selected
      if (!values.file) {
        errors.file = 'Please select a file';
      }

      if (values.file && !['image/jpeg', 'image/png'].includes(values.file.type)) {
        errors.file = 'File type must be JPEG or PNG';
      }

      return errors
    }
  });

  return (
    <>
      <Title title="Token Generator" />
      <Stack component="form" autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
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
          <Grid item xs={12} sm={5}>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5} lg={7}>
                <Stack gap={2}>
                  <TextField
                    fullWidth
                    type='number'
                    id="decimal"
                    name="decimal"
                    label="Decimal"
                    value={formik.values.decimal}
                    onChange={formik.handleChange}
                    error={formik.touched.decimal && Boolean(formik.errors.decimal)}
                    helperText={formik.touched.decimal && formik.errors.decimal}
                  />

                  <TextField
                    fullWidth
                    type='number'
                    id="supply"
                    name="supply"
                    label="Supply"
                    value={formik.values.supply}
                    onChange={formik.handleChange}
                    error={formik.touched.supply && Boolean(formik.errors.supply)}
                    helperText={formik.touched.supply && formik.errors.supply}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={7} lg={5}>
                <DropzoneForm formik={formik} />
              </Grid>
            </Grid>
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
              type='url'
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
              type='url'
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
              type='url'
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
              type='url'
              label="Discord URL"
              value={formik.values.discord}
              onChange={formik.handleChange}
              error={formik.touched.discord && Boolean(formik.errors.discord)}
              helperText={formik.touched.discord && formik.errors.discord}
            />
          </Grid>
          <Grid item xs={12}>
           {mint && <Stack mb={3} direction="row" alignItems="center" gap={1}>
              <Typography variant='body2'>Generated Mint:</Typography>
              <Typography fontSize={13} style={{ color: green[300] }}>{mint}</Typography>
            </Stack>}
            {<Button
              sx={{ float: "inline-end" }}
              variant="contained"
              disabled={isLoading}
              color="primary"
              type="submit">
              Generate Token
            </Button>}
          </Grid>
        </Grid>

        <CustomSnackbar
          open={snackbar}
          setOpen={setSnackbar}
          message={message}
        />
      </Stack>
    </>
  );
};

Page.getLayout = (page) => {
  return <Layout title="Token Generator">
    <CustomCard>
      {page}
    </CustomCard>
  </Layout>
}

export default Page;
