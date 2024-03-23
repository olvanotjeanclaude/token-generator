import React from 'react';
import { Stack, Box, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { FormikValues } from 'formik';

interface Props {
    formik: FormikValues;
}

const TabMultiAddress: React.FC<Props> = ({ formik }) => {
    // Function to handle the removal of an address
    const handleRemoveAddress = (index: number) => {
        const newAddresses = [...formik.values.addresses];
        newAddresses.splice(index, 1);
        formik.setFieldValue('addresses', newAddresses);
    };

    return (
        <Stack spacing={2} mt={2}>
            {formik.values.addresses.map((address: string, index: number) => (
                <Box key={index} display="flex" gap={1} alignItems="center" flexDirection={{ xs: "column", sm: "row" }}>
                    <TextField
                        fullWidth
                        id={`address-${index}`}
                        name={`addresses.${index}`}
                        label={`Address ${index + 1}`}
                        value={address}
                        onChange={formik.handleChange}
                        error={formik.touched.addresses && !!formik.errors.addresses && !!formik.errors.addresses[index]}
                        helperText={formik.touched.addresses && formik.errors.addresses && formik.errors.addresses[index]}
                    />
                    <Box>
                        <Button
                        disabled={formik.values.addresses.length==1}
                         color='error' 
                        onClick={() => handleRemoveAddress(index)}>Remove</Button>
                    </Box>
                </Box>
            ))}

            <Box textAlign="center">
                <Button
                    color='secondary'
                    onClick={() => formik.setFieldValue('addresses', [...formik.values.addresses, ''])}
                    style={{ marginTop: '8px' }}>
                    Add Address
                </Button>
            </Box>
        </Stack>
    );
}

export default TabMultiAddress;
