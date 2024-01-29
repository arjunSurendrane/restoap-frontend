/* eslint-disable no-unsafe-optional-chaining */
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

OrderDrawerBillDetails.propTypes = {
  data: PropTypes.object,
};
function OrderDrawerBillDetails({ data }) {
  const { branch } = useSelector((state) => state.branch);

  return (
    <>
      <Stack spacing={1} sx={{ p: '15px', display: 'flex', spacing: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle1">{data?.subtotalBillAmount}</Typography>
          </Box>
        </Box>
        {/* Other amount-related sections */}
        {branch?.taxRate ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">SGST @ 2.5 % </Typography>
              </Box>
              <Box>
                {' '}
                <Typography variant="subtitle2">
                  {(data?.charges?.tax / 2)?.toFixed(2) || 0}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2">CGST @ 2.5 %</Typography>
              </Box>
              <Box>
                {' '}
                <Typography variant="subtitle2">
                  {(data?.charges?.tax / 2)?.toFixed(2) || 0}
                </Typography>
              </Box>
            </Box>
          </>
        ):''}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">
              Additional Charges ( {data?.charges?.additionalCharge?.name} )
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">{data?.charges?.additionalCharge?.amount}</Typography>
          </Box>
        </Box>
        {data?.charges?.parcelCharge ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2">Parcel Charge</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">{data?.charges?.parcelCharge}</Typography>
            </Box>
          </Box>
        ) : (
          ''
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">Gross Amount</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">
              {data?.grossAmount}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Rounded</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{data?.roundoffAmount || 0}</Typography>
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
          <Typography variant="subtitle2">{data?.finalBillAmount}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default OrderDrawerBillDetails;
