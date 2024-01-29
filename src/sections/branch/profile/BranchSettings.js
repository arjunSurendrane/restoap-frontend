import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, Button, InputLabel, Switch, TextField, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBranches, getStore, updateSettings } from '../../../redux/slices/branch';
import { useAuthContext } from '../../../auth/useAuthContext';
import CustomButton from '../../../components/button/CustomButton';

const BranchSettings = () => {
  const dispatch = useDispatch();
  const { branches, branch, isLoading } = useSelector((state) => state.branch);
  const { user } = useAuthContext();
  const [isKitchenHaveScreen, setIsKitchenHaveScreen] = useState(false);
  const [isQrOrderAwailable, setIsQrOrderAwailable] = useState(false);
  const [isTakeawayAwailable, setIsTakeawayAwailable] = useState(false);
  const [parcelCharge, setParcelCharge] = useState('');
  const { id: storeId } = useParams();

  console.log({ params: storeId });
  const branchProfile = user.storeId
    ? branch
    : branches?.results?.find((data) => data.id === storeId);

  console.log({ branchProfile });

  useEffect(() => {
    if ((branches && branches.results && branches.results[0]) || branchProfile) {
      setParcelCharge(branchProfile.parcelCharge);
      setIsKitchenHaveScreen(branchProfile.isKitchenHaveScreen);
      setIsQrOrderAwailable(branchProfile.isQrOrderAwailable);
      setIsTakeawayAwailable(branchProfile.isTakeawayAwailable);
    }
  }, [branchProfile, branches]);

  const handleParcelChargeChange = (e) => {
    setParcelCharge(e.target.value);
  };

  const handleIsKitchenHaveScreenChange = (e) => {
    setIsKitchenHaveScreen(e.target.checked);
  };

  // Function to set qr code active/not active
  const handleIsQrawailable = (e) => setIsQrOrderAwailable(e.target.checked);

  // Fuction to set takeaway active/not active
  const handleIsTakeawayAvailable = (e) => setIsTakeawayAwailable(e.target.checked);

  const handleSubmitSettings = async () => {
    try {
      const response = await updateSettings(branchProfile.id, {
        parcelCharge,
        isKitchenHaveScreen,
        isQrOrderAwailable,
        isTakeawayAwailable,
      });
      // Handle response as needed
      toast.success('Updated Successfully');
      dispatch(getStore(branchProfile.id));
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!branchProfile) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          m: 1,
          gap: 1,
          borderRadius: 1,
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Typography variant="h4">Settings</Typography>
      </Box>
      <Box bgcolor="#fff" boxShadow="0px 4px 4px 2px rgba(0, 0, 0, 0.05)" borderRadius="8px" padding={5}>
        <Box display="flex">
          <Box sx={{ display: 'flex'}}>
            <Typography fontSize="16px" fontFamily="500" color="black">Kitchen Screen Availability</Typography>
            <Switch
              size="small"
              id="variants-switch"
              name="variants"
              label="Variants"
              checked={isKitchenHaveScreen}
              onChange={handleIsKitchenHaveScreenChange}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingX: 3}}>
            <Typography>QR Order</Typography>
            <Switch
              size="small"
              id="variants-switch"
              name="variants"
              label="Variants"
              checked={isQrOrderAwailable}
              onChange={handleIsQrawailable}
            />
          </Box>
          <Box sx={{ display: 'flex', paddingX: 3}}>
            <Typography>Takeaway</Typography>
            <Switch
              size="small"
              id="variants-switch"
              name="variants"
              label="Variants"
              checked={isTakeawayAwailable}
              onChange={handleIsTakeawayAvailable}
            />
          </Box>
        </Box>
        <Box  display="flex" gap={2} mt={3}>
          <Typography sx={{ paddingY: 1 }}>Parcel Charge (%)</Typography>
          <TextField
            name="parcelCharge"
            size="small"
            type="number"
            required
            value={parcelCharge}
            onChange={handleParcelChargeChange}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end'}}>
          <CustomButton  variant="contained" value="submit" fun={handleSubmitSettings}/> 
         
        </Box>
      </Box>
    </>
  );
};

export default BranchSettings;
