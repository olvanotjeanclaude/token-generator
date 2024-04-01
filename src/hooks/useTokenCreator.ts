import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { FormikValues, useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup'
import useCustomSnackbar from './useCustomSnackbar';
import useFormState from './useFormState';
import MintManager, { IMetadata } from '@/app/MintManager';
import useRpc from './useRpc';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    symbol: Yup.string().required('Symbol is required').max(8, "The symbol must be less than 8"),
    decimal: Yup.number().required('Decimal is required').max(10, "Cannot be more than 10").positive('Decimal must be a positive number'),
    file: Yup.string().required('File is required'),
    supply: Yup.number().required('Supply is required').positive('Supply must be a positive number'),
    description: Yup.string().required('Description is required'),
    website: Yup.string().url('Invalid URL'),
    twitter: Yup.string().url('Invalid URL'),
    telegram: Yup.string().url('Invalid URL'),
    discord: Yup.string().url('Invalid URL'),
});

const initialValues = {
    name: '',
    symbol: '',
    decimal: '9',
    supply: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    file: null
};


const useTokenCreator = () => {
    const { wallet, publicKey } = useWallet();
    const rpc = useRpc();
    const [mint, setMint] = useState("");
    const { message, setMessage, snackbar, setSnackbar } = useCustomSnackbar();
    const { isLoading, setIsLoading, setErrors, resetState } = useFormState();

    const handleSubmit = useCallback(async (values: FormikValues) => {
        try {
            if (!publicKey) {
                setMessage({
                    type: "error",
                    text: "Please connect to your phantom wallet"
                });
                setSnackbar(true);
                return;
            }

            setMint("");

            resetState();

            setIsLoading(true);
    

            const metadata: IMetadata = {
                name: values.name,
                image: "",
                symbol: values.symbol,
                description: values.description,
                extensions: {
                    twitter: values.twitter,
                    telegram: values.telegram,
                    discord: values.discord,
                    website:values.website
                }
            };

            const mintManager = new MintManager(rpc, wallet as Wallet, metadata);

            await mintManager.uploadMetadata(values.file);

            const mint = await mintManager.buildMint(values.supply, values.decimal);

            setMessage({
                type: "success",
                text: "Token generated successfully"
            });
            setMint(mint);
            setSnackbar(true);
            formik.resetForm();
        } catch (error) {
            setErrors(error as string);
            setMessage({
                type: "error",
                text: error as string
            });
            setSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    }, [publicKey, wallet, rpc.connection]);


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        validate: (values) => {
            const errors: any = {};

            if (!values.file) {
                errors.file = 'Please select a file';
            }

            // @ts-ignore
            if (values.file && !['image/jpeg', 'image/png'].includes(values.file.type)) {
                errors.file = 'File type must be JPEG or PNG';
            }

            return errors
        }
    });

    return {
        formik,
        isLoading,
        snackbar,
        setSnackbar,
        message,
        mint,
        rpc
    };
}

export default useTokenCreator;