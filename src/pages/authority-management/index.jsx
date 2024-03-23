// Import the necessary dependencies
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Stack, Box, Tabs, Tab, FormControlLabel, Checkbox, Button } from '@mui/material';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';
import TabMultiAddress from './(components)/TabMultiAddress';
import TabTokenFromWallet from './(components)/TabTokenFromWallet';

// Define the validation schema
const validationSchema = Yup.object().shape({
  addresses: Yup.array().of(
    Yup.string().required('Address is required')
  ).min(1, 'At least one address is required'),
  freezeAuthority: Yup.boolean(),
  mintAuthority: Yup.boolean(),
});

// Define the initial values
const initialValues = {
  addresses: [''],
  freezeAuthority: false,
  mintAuthority: false,
  tokens: []
};

const AuthorityManagementPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  // Render the component
  return (
    <Layout title="Authority Management">
      <Title title='Authority Management' />
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <CustomCard>
          <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary">
            <Tab label="Multi Address" />
            <Tab label="Token from Wallet" />
          </Tabs>
          <Box hidden={tabIndex !== 0}>
            <TabMultiAddress
              formik={formik}
            />
          </Box>
          <Box hidden={tabIndex !== 1}>
            <TabTokenFromWallet formik={formik} />
          </Box>

          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.freezeAuthority || false}
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
                    checked={formik.values.mintAuthority || false}
                    onChange={formik.handleChange}
                    name="mintAuthority"
                    color="primary"
                  />
                }
                label="Mint Authority"
              />
            </Box>

            <Button type="submit" variant='contained' style={{ marginTop: '8px' }}>Submit</Button>
          </Box>
        </CustomCard>
      </form>
    </Layout>
  );
};

export default AuthorityManagementPage;
