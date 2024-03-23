import TokenAuthorization from '@/app/TokenAuthorization';
import WalletNotConnectedError from '@/app/error/WalletNotConnectedError';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import useFormState from '@/hooks/useFormState';
import { useWallet } from '@solana/wallet-adapter-react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    addresses: Yup.array().of(
        Yup.string()
            .matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string')
    ).min(1, 'At least one address is required'),
    freezeAuthority: Yup.boolean(),
    mintAuthority: Yup.boolean(),
});

const initialValues = {
    addresses: [''],
    freezeAuthority: false,
    mintAuthority: false,
    tokens: []
};

const useTokenAuthority = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { wallet, publicKey } = useWallet();
    const { message, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const { response, setResponse, isLoading, setIsLoading, resetState } = useFormState();

    const tokenAuthorization = new TokenAuthorization(wallet);

    const handleTabChange = (event, newValue) =>  setTabIndex(newValue);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validate(values) {
            if (formik.errors?.addresses?.length > 0 && tabIndex == 1) {
                setTabIndex(0);
                return
            }
        },
        onSubmit: submitForm
    });
    

    async function revokeFreezeAndMint() {
        try {
            const result = await tokenAuthorization.revokeFreezeAndMintAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Both freeze and mint authorities revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", "Unable to revoke freeze and mint authorities");
        }
        return null;
    };

    async function revokeFreeze() {
        try {
            const result = await tokenAuthorization.revokeFreezeAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Freeze authority revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", "An error occurred while revoking freeze authority");
        }
        return null;
    };

    async function revokeMint() {
        try {
            const result = await tokenAuthorization.revokeMintAuthority();
            if (result) {
                setResponse(result);
                alertSnackbar("success", "Mint authority revoked successfully");
                return result;
            }
        } catch (error) {
            alertSnackbar("error", "An error occurred while revoking mint authority");
        }
        return null;
    };

    async function submitForm(values) {
        if (!publicKey) return alertSnackbar("error", WalletNotConnectedError.MESSAGE);

        const tokens = Array.from(new Set([...values.addresses, ...values.tokens])).filter(address => address !== "");

        if (tokens.length == 0) return alertSnackbar("error", "Please provide the token address that you want to manage");

        if (!values.freezeAuthority && !values.mintAuthority) {
            return alertSnackbar("error", "Please select either freeze or mint authority to revoke.");
        }

        tokenAuthorization.setTokens(tokens);

        try {
            setIsLoading(true);

            if (values.freezeAuthority && values.mintAuthority) {
                const signature = await revokeFreezeAndMint();
                console.log(signature);
                return
            }

            if (values.freezeAuthority) {
                const signature = await revokeFreeze();
                console.log(signature);
                return
            }

            if (values.mintAuthority) {
                const signature = await revokeMint();
                console.log(signature);
                return
            }
        } catch (error) {
            alertSnackbar("error", "Unexpected error occurred");
        }
        finally {
            setIsLoading(false);
        }
    }


    return {
        formik,
        handleTabChange,
        tabIndex,
        isLoading,
        snackbar,
        setSnackbar,
        message,
        response
    };
};

export default useTokenAuthority;