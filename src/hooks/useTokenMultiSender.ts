import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useCustomSnackbar from './useCustomSnackbar';
import useFormState from './useFormState';
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import TokenManager, { IMultiSender } from '@/app/TokenManager';
import { PublicKey } from '@solana/web3.js';
import useRpc from './useRpc';

const validationSchema = Yup.object().shape({
    senders: Yup.array().of(
        Yup.object().shape({
            address: Yup.string().matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string'),
            amount: Yup.number()
                .when('address', {
                    is: (val: string) => !!val,
                    then: schema => schema.required('Amount is required')
                        .positive('Amount must be positive'),
                    otherwise: () => Yup.number(),
                })
                .positive('Amount must be positive'),
        })
    ),
    tokenAddress: Yup.string()
        .required('Token address is required')
        .matches(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Token address must be a valid base58 string')
});

const initialValues = {
    senders: [{ address: "", amount: 0 }],
    addresses: [],
    tokenAddress: ""
};

const useTokenMultiSender = () => {
    const [senderCount, setSenderCount] = useState(1);
    const { wallet, publicKey } = useWallet();
    const { message, setMessage, alertSnackbar, snackbar, setSnackbar } = useCustomSnackbar();
    const { response, setResponse, isLoading, setIsLoading, resetState } = useFormState();
    const rpc = useRpc();


    const addSender = () => {
        setSenderCount(prevCount => prevCount + 1);
        formik.setFieldValue(`senders[${senderCount}]`, { address: '', amount: '' });
    };

    const removeSender = (indexToRemove: number) => {
        setSenderCount(prevCount => prevCount - 1);
        const updatedSenders = formik.values.senders.filter((_, index) => index !== indexToRemove);
        formik.setFieldValue('senders', updatedSenders);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!publicKey) {
                setMessage({
                    type: "error",
                    text: "Please connect to your phantom wallet"
                });
                setSnackbar(true);
                return;
            }

            resetState()

            const addresses: IMultiSender[] = [...values.senders, ...values.addresses]
                .filter(value => {
                    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
                    return base58Regex.test(value.address) && value.amount;
                });

            const uniqueAddresses = Array.from(new Set(addresses.map(value => value.address)))

            if (uniqueAddresses.length != addresses.length) return alertSnackbar("error", "Duplicate addresses are not allowed");


            if (addresses.length == 0) {
                setMessage({
                    type: "error",
                    text: "No destination provided"
                })
                return setSnackbar(true)
            }

            try {
                setIsLoading(true)

                const mint = new PublicKey(values.tokenAddress);
                const token = new TokenManager(rpc, mint, wallet as Wallet);

                const signature = await token.sendMultiple(addresses);

                setMessage({
                    type: "success",
                    text: "Transfer successfully"
                })
                setSnackbar(true);
                setResponse(signature);
                formik.resetForm()
                setSenderCount(1);
            } catch (error) {
                console.log(error);
                setMessage({
                    type: "error",
                    text: error as string ?? "unexpected error occurred"
                });
                setSnackbar(true)
            }
            finally {
                setIsLoading(false);
            }
        },
    });

    return {
        formik,
        senderCount,
        addSender,
        removeSender,
        response,
        isLoading,
        snackbar,
        setSnackbar,
        message
    };
}

export default useTokenMultiSender