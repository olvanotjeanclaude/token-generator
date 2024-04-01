import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const RevokeAuthorityInstruction = () => {
  const action = "freeze authority or mint authority or freeze and mint authority";
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color="primary">How to Use?</Typography>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            First, <strong>connect your wallet</strong> to enable the software.
          </Typography>

          <Typography component="li">
            Next, select the <strong>token</strong> from your wallet.
          </Typography>

          <Typography component="li">
            To revoke the {action}, you should use the wallet that created that token (Authority).
          </Typography>

          <Typography component="li">
            Then, click on <strong>Revoke {action}</strong>.
          </Typography>

          <Typography component="li">
            Accept the transaction.
          </Typography>

          <Typography component="li">
            Finally, wait a moment for the changes to be applied.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RevokeAuthorityInstruction;
