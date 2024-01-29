import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { StyledAddButton } from '../../../theme/overrides/Button';
import { useDispatch, useSelector } from '../../../redux/store';
import { uploadMultipleMenu } from '../../../redux/slices/menu';

MultipleUploadStep4.propTypes = {
  menuData: PropTypes.array,
  setOpen: PropTypes.array,
  storeId: PropTypes.string,
};
function MultipleUploadStep4({ menuData, setOpen, storeId }) {
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    console.log('menu upload sadasd', menuData);
    const res = await dispatch(uploadMultipleMenu(menuData, storeId));
    console.log('res in multiple', res);
    setResponse(res);
    if (res.code === 409) {
      toast.error(res.message);
    } else {
      toast.success('Items Added Successfully');
      setOpen(false);
    }
  };

  console.log('response in menustepper', response);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img src="/assets/images/Menu/MenuBulkUploadFinalImage.svg" alt="background" />
      <Typography variant="h4">Ready To Upload</Typography>
      <Typography>
        You are ready to create the digital menu for the file you uploaded. Click below to confirm.
      </Typography>

      <StyledAddButton onClick={handleSubmit}>Confirm</StyledAddButton>
    </Box>
  );
}

export default MultipleUploadStep4;
