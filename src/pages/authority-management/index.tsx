import React from 'react';
import { TextField, Button, ButtonGroup, FormControlLabel, Checkbox, Stack, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  freezeAuthority: Yup.boolean(),
  mintAuthority: Yup.boolean(),
});

const initialValues = {
  address: '',
  freezeAuthority: false,
  mintAuthority: false,
};

const AuthorityManagementPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  const handleTokenToWallet = () => {
    // Handle token to wallet action here
  };

  return (
    <Layout title="Authority Management">
      <Title title='Authority Management' />
      <CustomCard>
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

          <Box display="flex">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.freezeAuthority}
                  onChange={formik.handleChange}
                  name="freezeAuthority"
                  color="primary"
                />
              }
              label="Freeze Authority"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.mintAuthority}
                  onChange={formik.handleChange}
                  name="mintAuthority"
                  color="primary"
                />
              }
              label="Mint Authority"
            />
          </Box>

          <Stack spacing={1} direction="row" >
            <Button type="submit" variant='contained'>Submit</Button>
            <Button variant='contained' onClick={handleTokenToWallet}>Connect  to Wallet</Button>
          </Stack>
        </Stack>
      </CustomCard>
    </Layout>
  );
};

export default AuthorityManagementPage;
