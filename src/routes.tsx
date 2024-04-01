import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContactsIcon from '@mui/icons-material/Contacts';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

const routes = [
    {
        title: "Homepage",
        path: "/",
        icon: <HomeIcon />
    },
    {
        title: "Token Creator",
        path: "/token-creator",
        icon: <MonetizationOnIcon />
    },
    {
        title: "Mint Token",
        path: "/mint-token",
        icon: <MoreTimeIcon />
    },
    {
        title: "Token Multisender",
        path: "/token-multisender",
        icon: <SendIcon />
    },
    {
        title: "Authority Management",
        path: "/authority-management",
        icon: <SecurityIcon />
    },
    {
        title: "Wallet Generator",
        path: "/wallet-generator",
        icon: <AccountBalanceWalletIcon />
    },
    {
        title: "Contacts",
        path: "/contacts",
        icon: <ContactsIcon />
    }
];

export default routes;
