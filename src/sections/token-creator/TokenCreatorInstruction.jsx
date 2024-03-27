import React from 'react';
import { Typography, Link, Stack, CardContent, Card } from '@mui/material';
import CustomCard from '@/components/CustomCard';

function TokenCreatorInstruction() {
  return (
    <Card>
      <CardContent>
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

          <Typography component="li">
            <Link
              href="/revoke-authority"
              target="_blank"
              rel="noreferrer noopener"
            >
              revoke freeze authority </Link> and
            <Link
             href="/revoke-authority"
              target="_blank"
              rel="noreferrer noopener"
            >
              revoke mint authority
            </Link>
            .
          </Typography>

          <Typography component="li">
            <strong>Click</strong> on "Create Token" and <strong>accept</strong> the <strong>transaction</strong>.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TokenCreatorInstruction;
