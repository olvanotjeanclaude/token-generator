import { Box, Stack, Typography, Button, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image'


export default function TokenCreatorDropzone({ formik }) {
  const [filePreview, setFilePreview] = useState(null);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onFileDialogCancel() {
      formik.setFieldValue("file", "");
      setFilePreview(null)
  },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];

        setFilePreview({
          file,
          preview: URL.createObjectURL(file)
        });

        formik.setFieldValue("file", file);
        formik.setFieldError("file", ""); // Clear any previous error
      } else {
        // Show error message or handle multiple files
    
        formik.setFieldError("file", "Please select only one image file.");
      }
    }
  });

  const { ref, ...rootProps } = getRootProps();

  return (
    <>
      <Box
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          px:2,
          border: "1px dashed #ccc",
          minHeight: 110,
          maxHeight: 110,
          cursor: "pointer"
        }}
        p={1}
        {...rootProps}
      >
        <Stack>
          <input {...getInputProps()}  />
          {!filePreview ? (
            <Typography textAlign="center">Drag and drop an image here, or click to select an image file</Typography>
          ) : (

            <Stack gap={1} alignItems="center" direction="row">
              <Image
                src={filePreview.preview}
                alt="Preview"
                width={110}
                height={110}
              />
              <Typography variant='subtitle1' textAlign="center">Drop the files here</Typography>
            </Stack>

          )}
        </Stack>
      </Box>

      <FormHelperText sx={{textAlign:"center"}} error={!!formik.errors.file}>{formik.errors.file}</FormHelperText>
    </>
  );
}
