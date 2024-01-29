import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PrevOrderDrawerBillDetails({ orderData }) {
  const { charges } = orderData;
  const { branch } = useSelector((state) => state.branch);
  console.log({ charges });
  const tax = ((charges && charges.tax) / 2).toFixed(2);
  return (
    <>
      <Stack spacing={1} sx={{ p: '15px', display: 'flex', spacing: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle1">{orderData?.subtotalBillAmount}</Typography>
          </Box>
        </Box>
        {/* Other amount-related sections */}
        {branch?.taxRate>0 ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">SGST @ {charges.tax / 2} % </Typography>
              </Box>
              <Box>
                {' '}
                <Typography variant="subtitle2">{tax}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">CGST @ {charges.tax / 2}%</Typography>
              </Box>
              <Box>
                {' '}
                <Typography variant="subtitle2">{tax}</Typography>
              </Box>
            </Box>
          </>
        ) : (
          ''
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">
              Additional Charges ( {charges?.additionalCharge?.name || 0} )
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">{charges?.additionalCharge?.amount || 0}</Typography>
          </Box>
        </Box>
        {charges?.parcelCharge > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2">
                Parcel Charges 
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">{charges?.parcelCharge}</Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">Gross Amount</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">{orderData.grossAmount.toFixed(2)}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Rounded</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle1">{orderData?.roundoffAmount}</Typography>
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#D9D9D9',
          paddingInline: '15px',
          minHeight: '35px',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle2">GRAND TOTAL</Typography>
        </Box>
        <Box>
          {' '}
          <Typography variant="subtitle2">{orderData?.finalBillAmount}</Typography>
        </Box>
      </Box>
    </>
  );
}

PrevOrderDrawerBillDetails.propTypes = {
  orderData: PropTypes.object,
};
export default PrevOrderDrawerBillDetails;
