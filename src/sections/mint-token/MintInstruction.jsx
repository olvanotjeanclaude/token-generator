import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const MintInstruction = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color="primary">How to Use?</Typography>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            First, <strong>connect your wallet</strong> to enable the software.
          </Typography>

          <Typography component="li">
            Next, choose the <strong>token</strong> from your wallet.
          </Typography>

          <Typography component="li">
            Note: On selection, the software displays basic information for your token such as token supply, decimal, mint, and freeze authority. If the mint is represented as "-", it indicates that you cannot mint tokens. The same applies to freeze authority.
          </Typography>

          <Typography component="li">
            Specify the <strong>quantity</strong> you wish to mint.
          </Typography>

          <Typography component="li">
            Then, click on <strong>Mint Token</strong> and confirm the transaction.
          </Typography>

          <Typography component="li">
            Afterward, wait briefly for your update to process.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MintInstruction;
