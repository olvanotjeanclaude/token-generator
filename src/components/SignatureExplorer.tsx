import { signatureLink, truncateText } from '@/helper';
import useRpc from '@/hooks/useRpc';
import { Box, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';



const SignatureExplorer = ({ signature }: { signature: string }) => {
    const { mode } = useRpc();
    return (
        <Box display="flex" gap={0.3} alignItems="center" overflow="hidden">
            <Typography fontSize={14} component="span">Signature:</Typography>
            <Typography
                component="a"
                target="_blank"
                fontSize={14}
                color={green[500]}
                href={signatureLink(mode, signature)}
                title={signatureLink(mode, signature)}
                sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                {truncateText(signature)}
            </Typography>
        </Box>
    );
};

export default SignatureExplorer;
