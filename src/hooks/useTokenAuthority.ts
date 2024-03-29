import TokenAuthorization from '@/app/TokenAuthorization';
import WalletNotConnectedError from '@/app/error/WalletNotConnectedError';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import useFormState from '@/hooks/useFormState';
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useRpc from './useRpc';

const validationSchema = Yup.object().shape({
    addresses: Yup.array().of(
        Yup.string()
            .matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string')
    ).min(1, 'At least one address is required'),
    tokenAddress: Yup.string()
        .matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string')
        .min(1, 'At least one address is required'),
});

const initialValues = {
    addresses: [''],
    tokenAddress: "",
};

const useTokenAuthority = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { wallet, publicKey } = useWallet();
    const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const {rpcUrl} = useRpc();
    const { response, setResponse } = useFormState();
    const [tokens, setTokens] = useState<string[]>([]);
    const [loading, setLoading] = useState({
        freeze: false,
        mint: false,
        freezeAndMint: false
    });

    const handleTabChange = (event:any, newValue:number) => setTabIndex(newValue);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validate(values) {
            if(!formik.errors.addresses) return;
           
            if (formik.errors.addresses.length > 0 && tabIndex == 1) {
                setTabIndex(0);
                return
            }
        },
        onSubmit: () => { }
    });

    useEffect(() => {
        const current = tabIndex == 0 ? formik.values.addresses : [formik.values.tokenAddress];
        const uniqueTokens = Array.from(new Set(current));
        const validBase58 = /^[1-9A-HJ-NP-Za-km-z]+$/;
        const data = uniqueTokens.filter(address => address !== "" && validBase58.test(address));
        setTokens(data);
    }, [tabIndex, formik.values.addresses, formik.values.tokenAddress]);


    async function revokeFreezeAndMint() {
        if (!isFormValid()) return false;

        try {
            setLoading(prev => ({ ...prev, freezeAndMint: true }));
            
            const tokenAuthorization = new TokenAuthorization(rpcUrl,wallet as Wallet);
            tokenAuthorization.setTokens(tokens);
            const result = await tokenAuthorization.revokeFreezeAndMintAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Both freeze and mint authorities revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", "Unable to revoke freeze and mint authorities");
        } finally {
            setLoading(prev => ({ ...prev, freezeAndMint: false }));
        }
        return null;
    };

 
    async function revokeFreeze() {
        if (!isFormValid()) return false;

        try {
            setLoading(prev => ({ ...prev, freeze: true }));

            const tokenAuthorization = new TokenAuthorization(rpcUrl,wallet as Wallet);
            tokenAuthorization.setTokens(tokens);
            const result = await tokenAuthorization.revokeFreezeAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Freeze authority revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", error as string);
        } finally {
            setLoading(prev => ({ ...prev, freeze: false }));
        }
        return null;
    };

    async function revokeMint() {
        if (!isFormValid()) return false;

        try {
            setLoading(prev => ({ ...prev, mint: true }));

            const tokenAuthorization = new TokenAuthorization(rpcUrl,wallet as Wallet);
            tokenAuthorization.setTokens(tokens);
            const result = await tokenAuthorization.revokeMintAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Mint authority revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", "An error occurred while revoking mint authority");
        } finally {
            setLoading(prev => ({ ...prev, mint: false }));
        }
        return null;
    };

    function isFormValid() {

        if (!publicKey) return alertSnackbar("error", WalletNotConnectedError.MESSAGE);

        if (tokens.length == 0) return alertSnackbar("error", "Please provide the token address that you want to manage");

        return true;
    }

    return {
        formik,
        handleTabChange,
        tabIndex,
        loading,
        snackbar,
        setSnackbar,
        message,
        response,
        revokeFreeze,
        revokeMint,
        revokeFreezeAndMint
    };
};

export default useTokenAuthority;