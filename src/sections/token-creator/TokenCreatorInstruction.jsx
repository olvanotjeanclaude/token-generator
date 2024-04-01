import React from 'react';
import { Typography, Stack, CardContent, Card, Box } from '@mui/material';
import CustomCard from '@/components/CustomCard';
import Link from 'next/link';

function TokenCreatorInstruction() {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' color="primary">How to Use?</Typography>
        <Stack gap={1.33} pl={2} component="ol">
          <Typography component="li">
            To begin, <strong>connect your wallet</strong> to access the software.
          </Typography>

          <Typography component="li">
            Next, provide the <strong>name</strong> for your <strong>token</strong>.
          </Typography>

          <Typography component="li">
            Enter the <strong>abbreviation</strong> for your SPL Token's "Symbol" (up to 8 letters).
          </Typography>

          <Typography component="li">
            Specify the <strong>decimals</strong> for your token (usually 6 or 9 decimals).
          </Typography>

          <Typography component="li">
            Choose the <strong>supply</strong> of your token.
          </Typography>

          <Typography component="li">
            Upload your token's <strong>image</strong> (JPEG, JPG, PNG format).
          </Typography>

          <Typography component="li">
            Craft a <strong>description</strong> for your <strong>Solana Token</strong>.
          </Typography>

          <Typography component="li">
            Optionally, include social links such as Website, Twitter, Telegram, and Discord.
          </Typography>

          <Typography component="li" display="flex" flexWrap="wrap">
            <Typography
              component={Link}
              sx={{textDecoration:"none"}}
              href="/authority-management"
              color="primary"
            >Revoke Freeze Authority
            </Typography>

            <Typography mx={1}>and</Typography>

            <Typography
              component={Link}
              sx={{textDecoration:"none"}}
              href="/authority-management"
              color="primary"
            >Revoke Mint Authority
            </Typography>
          </Typography>

          <Typography component="li">
            Finally, <strong>click</strong> "Generate Token" and <strong>confirm</strong> the <strong>transaction</strong>.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TokenCreatorInstruction;
