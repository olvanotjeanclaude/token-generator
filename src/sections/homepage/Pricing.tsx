import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import Title from './Title';
import Fee from '@/app/enumeration/Fee'; // Import Fee enum
import { green } from '@mui/material/colors';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Link from 'next/link';

export default function Pricing() {
    const products = [
        {
            name: "Token Creator",
            path: "token-creator",
            icon: <MonetizationOnIcon sx={{ fontSize: "2.8rem", my: 2 }} />,
            features: [
                "Custom token creation",
                "No coding required",
                "Quick and easy process",
                "Metadata included"
            ],
            fee: Fee.TokenCreator // Add fee property
        },
        {
            name: "Token Minter",
            path: "mint-token",
            icon: <MoreTimeIcon sx={{ fontSize: "2.8rem", my: 2 }} />,
            features: [
                "Effortless token minting",
                "Controlled distribution",
                "Flexible supply"
            ],
            fee: Fee.MintToken // Add fee property
        },
        {
            name: "Token Multisender",
            path: "token-multisender",
            icon: <SendIcon sx={{ fontSize: "2.8rem", my: 2 }} />,
            features: [
                "token distribution",
                "Simple transfers",
                "Bulk transaction"
            ],
            fee: Fee.MultiSender // Add fee property
        },
        {
            name: "Revoke Authority",
            path: "authority-management",
            icon: <SecurityIcon sx={{ fontSize: "2.8rem", my: 2 }} />,
            features: [
                "Authority management",
                "Revoke Freeze Authority",
                "Revoke Mint Authority",
            ],
            fee: Fee.RevokeFreezeAuthority // Add fee property
        },
    ];


    return (
        <Stack>
            <Title title='Pricing' />

            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} md={6} lg={3} key={product.path}>
                        <Card sx={{ minHeight: 420, position: "relative", borderRadius: 2, textAlign: "center" }}>
                            <CardContent>
                                {product.icon}

                                <Typography mb={2} variant='h5'>{product.name}</Typography>

                                <Divider />

                                <Typography my={2} fontSize="1.5rem" fontWeight={500} variant="h6" color={green[500]}>
                                    {product.fee} SOL
                                </Typography>

                                <Divider />

                                <Stack justifyContent="center" alignItems="center">
                                
                                <Typography my={2} pl={2} component="ul">
                                    {product.features.map((feature, index) => (
                                        <Typography  textAlign="left" component="li" key={index}>
                                            <Typography>{feature}</Typography>
                                        </Typography>
                                    ))}
                                </Typography>
                                </Stack>


                                <Box
                                    position="absolute"
                                    left={0}
                                    right={0}
                                    bottom={5} 
                                    display="flex"
                                    justifyContent="center"
                                    py={2}
                                    >
                                    <Link href={product.path}

                                    >
                                        <Button variant='outlined' color='info'>
                                            Start
                                        </Button>
                                    </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
