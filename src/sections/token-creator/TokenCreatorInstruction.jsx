import React from 'react';
import { Typography, Stack, CardContent, Card, Box } from '@mui/material';
import CustomCard from '@/components/CustomCard';
import Link from 'next/link';

function TokenCreatorInstruction() {
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
            Enter the <strong>name</strong> of your <strong>token</strong>.
          </Typography>

          <Typography component="li">
            Indicate the <strong>abbreviation</strong> of your SPL Token "Symbol"
            (max. 8 letters)
          </Typography>

          <Typography component="li">
            Select the <strong>decimals</strong> of your token (most often 6
            decimals).
          </Typography>

          <Typography component="li">
            Select the <strong>supply</strong>.
          </Typography>

          <Typography component="li">
            Upload your <strong>token image</strong> (PNG format)
          </Typography>

          <Typography component="li">
            Write the <strong>description</strong> for your <strong>Solana Token</strong>.
          </Typography>

          <Typography component="li">
            Optional: Add Social links: Website, Twitter (X), Telegram and
            Discord.
          </Typography>

          <Box component="li" display="flex" flexWrap="wrap">
            <Typography
              component={Link}
              sx={{textDecoration:"none"}}
              href="/authority-management"
              color="primary"
            >Revoke freeze authority
            </Typography>

            <Typography mx={1}>and</Typography>

            <Typography
              component={Link}
              sx={{textDecoration:"none"}}
              href="/authority-management"
              color="primary"
            >Revoke Mint authority
            </Typography>
          </Box>

          <Typography component="li">
            <strong>Click</strong> on "Generate Token" and <strong>accept</strong> the <strong>transaction</strong>.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TokenCreatorInstruction;
