import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const MintInstruction = () => {
  return (
    <Card>
      <CardContent>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            <strong>Connect</strong> your <strong>wallet</strong> to be able to
            use the software.
          </Typography>

          <Typography component="li">
            Select the <strong>Token</strong> from your wallet.
          </Typography>

          <Typography component="li">
            * To mint more you should use the wallet that created the Token (Authority)
          </Typography>

          <Typography component="li">
            Enter the <strong>quantity</strong> you want to mint.
          </Typography>


          <Typography component="li">
            Click on <strong>Mint Token</strong> and confirm the Transaction.
          </Typography>

          <Typography component="li">
            Mint Token
          </Typography>

          <Typography component="li">
            Wait a minute for your update.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MintInstruction;
