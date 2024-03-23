import { signatureLink } from '@/constants';
import { truncateText } from '@/helper';
import { Box, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';



const SignatureExplorer = ({ signature }) => {
    return (
        <Box display="flex" gap={0.3} alignItems="center" overflow="hidden">
            <Typography fontSize={14} component="span">Signature:</Typography>
            <Typography
                component="a"
                target="_blank"
                fontSize={14}
                color={green[500]}
                href={signatureLink(signature)}
                title={signatureLink(signature)}
                sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                {truncateText(signature)}
            </Typography>
        </Box>
    );
};

export default SignatureExplorer;
