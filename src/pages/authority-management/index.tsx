// Import the necessary dependencies
import React from 'react';
import {  Box, Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';
import TabMultiAddress from '@/sections/authority-management/TabMultiAddress';
import TabTokenFromWallet from '@/sections/authority-management/TabTokenFromWallet';
import CustomSnackbar from '@/components/CustomSnackbar';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import useTokenAuthority from '@/hooks/useTokenAuthority';
import SignatureExplorer from '@/components/SignatureExplorer';
import TokensToRevoks from '@/sections/authority-management/TokensToRevoks';


const AuthorityManagementPage = () => {
  const {
    formik,
    handleTabChange,
    tabIndex,
    isLoading,
    snackbar,
    setSnackbar,
    message,
    response
  } = useTokenAuthority();


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

            <LoadingButtonComponent label="Revoke" isLoading={isLoading} />
          </Box>

            {response &&
             <Box my={5}>
              <SignatureExplorer signature={response} />
            </Box>}
        </CustomCard>
        {/* <TokensToRevoks /> */}
      </form>
      <CustomSnackbar
        open={snackbar}
        setOpen={setSnackbar}
        message={message}
      />
    </Layout>
  );
};

export default AuthorityManagementPage;
