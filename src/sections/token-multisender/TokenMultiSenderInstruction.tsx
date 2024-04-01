import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const TokenMultiSenderInstruction = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color="primary">How to Use?</Typography>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            First, <strong>select your wallet</strong>.
          </Typography>

          <Typography component="li">
            You can either manually enter the destination address or upload a CSV file.
          </Typography>

          <Typography component="li">
            The CSV file format should be: <code><mark>address,amount</mark></code>, where address is the recipient's address and amount is the amount to send.
          </Typography>

          <Typography component="li">
            Upon changing the token address, the system displays basic information such as supply, decimal, freeze, and mint authority.
          </Typography>

          <Typography component="li">
            If you attempt to mint a token with revoked mint authority, the operation will not succeed.
          </Typography>

          <Typography component="li">
            You will need to confirm two transactions. First, associate the new token, then confirm and send the transaction.
          </Typography>

          <Typography component="li">
            Please wait for a few minutes to complete the transaction. The time may vary depending on the server (Remote Procedure Call).
          </Typography>

          <Typography component="li">
            Additionally, you can download the example CSV file <Typography component="a"
              textAlign="center"
              color="primary"
              sx={{ textDecoration: "none", }}
              href="/demo.csv">
              here
            </Typography> for clarity.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TokenMultiSenderInstruction;
