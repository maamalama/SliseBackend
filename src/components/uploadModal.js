import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import axiosInstance from 'src/utils/axios';
// @mui
import {Box, Button, TextField, Typography} from '@mui/material';
import {useCallback, useEffect, useMemo, useState} from 'react';
import useIsMountedRef from '../hooks/useIsMountedRef';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile(props) {
  const isMountedRef = useIsMountedRef();
  const {acceptedFiles, getRootProps, getInputProps, fileRejections} = useDropzone();
  const [whitelistName, setWhitelistName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const handleChange = useMemo(
    () => (event) => setWhitelistName(event.target.value),
    []
  );

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
    }
  });
  const upload = useCallback(async () => {
    var formData = new FormData();
    console.log(acceptedFiles);
    formData.append('file', acceptedFiles[0], acceptedFiles[0].name);
    formData.append('collectionName', whitelistName);
    const response = await axiosInstance.post('https://daoanalytics.herokuapp.com/api/analytics/storeWhitelist', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    if (response.data.data) {
      const storedWhitelists = {
        whitelists: [
          {
            id: response.data.data.id
          }
        ]
      };

      window.localStorage.setItem('storedWhitelists', JSON.stringify(storedWhitelists));
      window.location.reload(false);
    }
  }, [isMountedRef]);

  const handleChangeData = (props) => {
    console.log(props.target.value);
  }

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Box sx={{width: '100%'}}>
      <Typography align='left' variant='h6'>Add Your Collection</Typography>
      <Box
        component="form"
        sx={{
          paddingTop: '40px',
          paddingBottom: '20px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required={true} onChange={handleChangeData} fullWidth placeholder="Collection Name" color="grey"
                   variant="outlined"/>

      </Box>
      <Box sx={{
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '17px',
        paddingLeft: '15px',
        paddingBottom: '20px',
        borderRadius: '10px',

        backgroundColor: ' #F4F6F8',
        border: `1px dashed grey`,
        '&:hover': {opacity: 0.72, cursor: 'pointer'},
      }}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant="h5" sx={{paddingBottom: '10px'}}>Drop or Select file</Typography>
          <Typography sx={{fontSize: '14px'}}>Drop the file here or click <u>browse</u> through your
            machine</Typography>
        </div>
        <aside>

          <ul>{files}</ul>
        </aside>
      </Box>
      <Typography align='center' sx={{fontSize: '12px', paddingTop: '26px'}}>
        Upload the *.csv file of your whitelist. <br/> Max size of 3.1 MB
      </Typography>
      <Box textAlign='right' sx={{marginTop: '40px'}}>
        <Button variant="outlined" onClick={props.close} sx={{
          backgroundColor: 'white',
          color: 'black',
          marginRight: '15px',
          border: '1px solid rgba(236, 236, 236, .95)',
          ':hover': {opacity: '.6', backgroundColor: 'white', border: '1px solid rgba(236, 236, 236, .9)'}
        }}>
          Cancel
        </Button>

        <Button onClick={upload} type="submit" variant="contained" sx={{backgroundColor: 'grey'}}>
          Add
        </Button>

      </Box>
    </Box>
  );
}
