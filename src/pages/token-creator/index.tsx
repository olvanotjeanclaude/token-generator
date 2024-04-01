import React from 'react';
import { TextField, Grid, Stack, Box } from '@mui/material';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import TokenCreatorDropzone from '@/sections/token-creator/TokenCreatorDropzone';
import CustomSnackbar from '@/components/CustomSnackbar';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import SignatureExplorer from '@/components/SignatureExplorer';
import useTokenCreator from '@/hooks/useTokenCreator';
import TokenCreatorInstruction from '@/sections/token-creator/TokenCreatorInstruction';

const Page = () => {
  const {
    formik,
    mint,
    isLoading,
    snackbar,
    setSnackbar,
    message,
  } = useTokenCreator();
  return (
    <>
      <Stack component="form" autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item  xs={7}>
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
          <Grid item  xs={5}>
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
                <TokenCreatorDropzone formik={formik} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
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
        <Grid container mt={1} spacing={2}>
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

            {mint &&
              <Box mt={2} mb={5}>
                <SignatureExplorer signature={mint} />
              </Box>
            }
            <Box display="flex" justifyContent="end">
              <LoadingButtonComponent color='success' isLoading={isLoading} label="Generate Token" />
            </Box>
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

const TokenCreator = () => {
  return <Layout title="Token Generator">
    <Title title="Token Generator" />
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Page />
      </Grid>
      <Grid item xs={12} mt={{ xs: 5, md: 0 }} md={4}>
        <TokenCreatorInstruction />
      </Grid>
    </Grid>
  </Layout>
}

export default TokenCreator;
