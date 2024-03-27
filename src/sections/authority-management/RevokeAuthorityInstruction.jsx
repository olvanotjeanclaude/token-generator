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
        <Typography variant='h6' color="primary">How To Use?</Typography>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            <strong>Connect</strong> your <strong>wallet</strong> to be able to
            use the software.
          </Typography>

          <Typography component="li">
            Select the <strong>Token</strong> from your wallet.
          </Typography>

          <Typography component="li">
            To Revoke the {action} you should use the wallet that created that Token (Authority)
          </Typography>

          <Typography component="li">
            Click on <strong>Revoke {action}</strong>.
          </Typography>

          <Typography component="li">
            Accept the Transaction.
          </Typography>

          <Typography component="li">
            Wait a second and the changes will be applied.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RevokeAuthorityInstruction;
