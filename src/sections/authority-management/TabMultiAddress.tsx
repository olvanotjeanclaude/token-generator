import React from 'react';
import { Stack, Box, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { FormikValues } from 'formik';
import MintInfo from '@/components/MintInfo';
import CustomSnackbar from '@/components/CustomSnackbar';
import useCustomSnackbar from '@/hooks/useCustomSnackbar';
import CustomCard from '@/components/CustomCard';

interface Props {
    formik: FormikValues;
}

const TabMultiAddress: React.FC<Props> = ({ formik }) => {
   const {message,snackbar,setSnackbar} = useCustomSnackbar();
    const handleRemoveAddress = (index: number) => {
        const newAddresses = [...formik.values.addresses];
        newAddresses.splice(index, 1);
        formik.setFieldValue('addresses', newAddresses);
    };


    const handleAddAddress = () => {
        formik.setFieldValue('addresses', [...formik.values.addresses,""])
    }

    return (
        <Stack spacing={2} mt={2}>
            {formik.values.addresses.map((address: string, index: number) => (
                <CustomCard p={2} key={index}>
                    <Box display="flex" gap={1} alignItems="center" flexDirection={{ xs: "column", sm: "row" }}>
                        <TextField
                            fullWidth
                            id={`address-${index}`}
                            name={`addresses.${index}`}
                            label={`Address ${index + 1}`}
                            value={address}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.addresses && !!formik.errors.addresses && !!formik.errors.addresses[index]}
                            helperText={formik.touched.addresses && formik.errors.addresses && formik.errors.addresses[index]}
                        />
                        <Box>
                            <Button
                                disabled={formik.values.addresses.length == 1}
                                color='error'
                                onClick={() => handleRemoveAddress(index)}>Remove</Button>
                        </Box>
                    </Box>
                    
                    <MintInfo mt={1} pl={1} direction='row'  publicKey={formik.values.addresses[index]} />
                </CustomCard>
            ))}

            <Box textAlign="center">
                <Button
                    color='secondary'
                    onClick={handleAddAddress}
                    sx={{ mb: 3 }}>
                    Add Address
                </Button>
            </Box>
            <CustomSnackbar message={message} open={snackbar} setOpen={setSnackbar} />
        </Stack>
    );
}

export default TabMultiAddress;
