import { Box, Typography, BoxProps } from '@mui/material';
import CustomSnackbar from './CustomSnackbar';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import React, { useEffect, useState } from 'react';
import AccountManager, { TMint } from '@/app/AccountManager';
import useFormState from '@/hooks/useFormState';
import CustomCard from './CustomCard';
import { signatureLink } from '@/helper';
import useRpc from '@/hooks/useRpc';

type TMintInfo = {
  publicKey: string,
  direction?: "row" | "column"
}
type ExtendedBoxProps = TMintInfo & Omit<BoxProps, "publicKey">;

function Row({ label, value }: { label: string, value: string | number }) {
  const {mode} = useRpc();
  const isAuthority = label === "Mint Authority" || label === "Freeze Authority";
  return (
    <Box display="flex" flexDirection="row" alignItems="center" mb={1} overflow="hidden">
      <Box minWidth={110} mr={1} pr={1} borderRight={1} borderColor="text.secondary">
        <Typography variant='body2' fontWeight={400}>{label}</Typography>
      </Box>
      <Box flex="1" overflow="hidden" textOverflow="ellipsis">
        {isAuthority ? (
          <Typography
            target='_blank'
            component="a"
            href={signatureLink(mode, value as string)}
            color="primary"
            variant='body2'
            sx={{ textDecoration: 'none' }}>
            {value}
          </Typography>
        ) : (
          <Typography variant='body2' color="primary">{value}</Typography>
        )}
      </Box>
    </Box>
  );
}

function MintInfo({ publicKey, ...props }: ExtendedBoxProps) {
  const rpc = useRpc();
  const { isLoading, setIsLoading } = useFormState();
  const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
  const [mint, setMint] = useState<TMint | null>(null);

  useEffect(() => {
    const fetchTokenSupply = async () => {
      if (!publicKey) return;
      setIsLoading(true);
      try {
        const data = await AccountManager.getMint(rpc, publicKey);
        setMint(data);
      } catch (error) {
        // alertSnackbar("error", error as string);
        setMint(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokenSupply();
  }, [publicKey,rpc.connection])

  return (
    mint ? <CustomCard {...props}>
      <Box display="flex" flexDirection="column">
        <Row label="Current Supply" value={mint?.supply ?? ""} />
        <Row label="Decimal" value={mint?.decimal ?? ""} />
        <Row label="Mint Authority" value={mint?.mintAuthority ?? "-"} />
        <Row label="Freeze Authority" value={mint?.freezeAuthority ?? "-"} />

      </Box>

      <CustomSnackbar message={message} open={snackbar} setOpen={setSnackbar} />
    </CustomCard> : <></>
  );
}

export default MintInfo;
