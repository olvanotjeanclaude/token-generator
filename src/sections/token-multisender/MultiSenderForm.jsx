import { Box, Stack, Typography } from '@mui/material';
import React, {  useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { isNumeric } from '@/helper';


export default function MultiSenderForm({ formik }) {
  const [filePreview, setFilePreview] = useState(null);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': [".csv"],
    },
    onFileDialogCancel() {
      formik.setFieldValue("addresses", []);
      setFilePreview(null)
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];

        Papa.parse(file, {
          complete: (results) => {
            if (!results.data) return;

            const parsedCsv = results.data.filter(address => {
              const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
              return base58Regex.test(address[0]) && isNumeric(address[1]);
            })
              .map(address => {
                const amount = parseFloat(address[1]) ?? 0;

                return { address: address[0], amount }
              });

            // console.log(parsedCsv)
            formik.setFieldValue("addresses", parsedCsv);

            setFilePreview(file);
          }
        });

      } else {
        formik.setFieldValue("addresses", []);
        setFilePreview(null)
      }
    }
  });

  const { ref, ...rootProps } = getRootProps();

  return (
    <>
      <Box
        my={2}
        sx={{
          border: "1px dashed #ccc",
          minHeight: 80,
          maxHeight: 80,
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        p={1}
        {...rootProps}
      >
        <Stack alignItems="center">


          <input {...getInputProps()} value={formik.values.file ?? ""} />
          {!filePreview ? (
            <Stack>
              <Typography textAlign="center">
                <CloudUploadIcon />
              </Typography>
              <Typography variant='caption'>Upload CSV file</Typography>
            </Stack>
          ) : (
            <Stack gap={1} alignItems="center" direction="row">
              <Typography variant='subtitle1' textAlign="center">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-filetype-csv" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879z" />
                </svg>
              </Typography>
            </Stack>

          )}
        </Stack>
      </Box>
      <Typography component="a"
      textAlign="center"
      color="primary"
        sx={{ textDecoration: "none",  }}
        href="/demo.csv">
        download csv example
        </Typography>
    </>
  );
}
