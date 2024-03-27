// Import the necessary dependencies
import React from 'react';
import { Box, Tabs, Tab, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import CustomCard from '@/components/CustomCard';
import TabMultiAddress from '@/sections/authority-management/TabMultiAddress';
import TabTokenFromWallet from '@/sections/authority-management/TabTokenFromWallet';
import CustomSnackbar from '@/components/CustomSnackbar';
import LoadingButtonComponent from '@/components/LoadingButtonComponent';
import useTokenAuthority from '@/hooks/useTokenAuthority';
import SignatureExplorer from '@/components/SignatureExplorer';
import RevokeAuthorityInstruction from '@/sections/authority-management/RevokeAuthorityInstruction';


const AuthorityManagementPage = () => {
  const {
    formik,
    handleTabChange,
    tabIndex,
    loading,
    snackbar,
    setSnackbar,
    message,
    response,
    revokeFreeze,
    revokeMint,
    revokeFreezeAndMint
  } = useTokenAuthority();


  return (
    <Layout title="Authority Management">
      {/* <Title title='Authority Management' /> */}
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

      <Box display="flex" mb={3} flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
        <LoadingButtonComponent
          label="Revoke Freeze Authority"
          color='warning'
          type='button'
          onClick={revokeFreeze}
          isLoading={loading.freeze} />

        <LoadingButtonComponent
          label="Revoke Mint Authority"
          color='error'
          type='button'
          onClick={revokeMint}
          isLoading={loading.mint} />

        <LoadingButtonComponent
          label="Revoke Freeze And Mint Authority"
          color='success'
          type='button'
          onClick={revokeFreezeAndMint}
          isLoading={loading.freezeAndMint} />
      </Box>

      {response &&
        <Box my={5}>
          <SignatureExplorer signature={response} />
        </Box>}

      <Grid container spacing={2}>
        <Grid item xs={12}  md={6} lg={4}>
          <RevokeAuthorityInstruction action="Freeze Authority" />
        </Grid>
        <Grid item xs={12}  md={6} lg={4}>
          <RevokeAuthorityInstruction action="Mint Authority" />
        </Grid>
        <Grid item xs={12}  md={6} lg={4}>
          <RevokeAuthorityInstruction action="Freeze And Mint Authority" />
        </Grid>
      </Grid>

      <CustomSnackbar
        open={snackbar}
        setOpen={setSnackbar}
        message={message}
      />
    </Layout>
  );
};

export default AuthorityManagementPage;
