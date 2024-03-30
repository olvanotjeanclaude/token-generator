import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import useCustomSnackbar from "./useCustomSnackbar";
import useFormState from "./useFormState";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { PublicKey } from "@solana/web3.js";
import TokenManager from "@/app/TokenManager";
import useRpc from "./useRpc";

const validationSchema = Yup.object().shape({
    tokenAddress: Yup.string().required('Token Address is required'),
    amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive'),
});

const initialValues = {
    tokenAddress: '',
    amount: '',
};

const useTokenMint = () => {
    const { wallet, publicKey } = useWallet();
    const { message, setMessage, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const { errors, setErrors, response, setResponse, isLoading, setIsLoading, resetState } = useFormState();
    const rpc = useRpc();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (!publicKey) return alertSnackbar("error", "Please connect your wallet first");

                resetState();

                setIsLoading(true);

                const mint = new PublicKey(values.tokenAddress);

                const tokenManager = new TokenManager(rpc, mint, wallet as Wallet)

                const signature = await tokenManager.mintTo(rpc, publicKey, parseInt(values.amount));

                if (signature) {
                    setMessage({
                        text: `Successfully minted ${values.amount} tokens.`,
                        type: "success"
                    })

                    setSnackbar(true);
                    setResponse(signature);
                    formik.resetForm();
                }
            } catch (error) {
                setErrors(error as string);
                return alertSnackbar("error", error as string);
            }
            finally {
                setIsLoading(false);
            }

        },
    });

    return {
        publicKey,
        formik,
        isLoading,
        errors,
        response,
        setErrors,
        message,
        snackbar,
        setSnackbar
    };
}

export default useTokenMint;