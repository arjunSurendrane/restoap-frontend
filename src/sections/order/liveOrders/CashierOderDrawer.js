/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';

// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Radio,
  Stack,
  Input,
  Badge,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  useMediaQuery,
  TableBody,
  TableCell,
  Table,
  Container,
} from '@mui/material';

// config
import moment from 'moment';
import { NAV } from '../../../config-global';
import { useDispatch, useSelector } from '../../../redux/store';
import { getBranches } from '../../../redux/slices/branch';
import { getCategories } from '../../../redux/slices/category';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// import { ColorMultiPicker } from '../../components/color-utils';
import {
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSlider,
} from '../../../components/hook-form';
import OrderInvoiceTablle from './OrderInvoiceTablle';
import OrderAddonsTablle from './OrderAddonsTable';
import KitchenInvoiceTable from './kitchenInvoiceTable';
import CashierIAddonsTable from './CashierIAddonsTable';
import CashierInvoiceTable from './CashierInvoiceTable';

// ----------------------------------------------------------------------

OrderCashierDrawer.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------
function OrderCashierDrawer({ data, open, onOpen, onClose }) {
  const dispatch = useDispatch();
  const timeAgo = moment(data.createdAt).fromNow();

  const isDesktop = useMediaQuery('(min-width:768px)');
  const { items, addOns } = data;
  const [isverified, setIsVerified] = useState(true);
  const [allOderComplete, SetAllOderComplete] = useState(false);
  const [isKitchen, setIsKitchen] = useState(true);

  return (
    <>
      {/* <Button
      disableRipple
      color="inherit"
      endIcon={<Iconify icon="ic:round-filter-list" />}
      onClick={onOpen}
    /> */}

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: false,
        }}
        PaperProps={{
          sx: { width: isDesktop ? '480px' : '320px', borderLeft: '#980403 2px solid' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5' }}
        >
          <Typography variant="h5">Order Details</Typography>

          <Box
            sx={{
              width: '26px',
              height: '26px',
              backgroundColor: '#AC161F',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconButton sx={{ color: 'white' }} onClick={onClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1">OrderNO : {data.OrderId} </Typography>
                <Typography sx={{ color: 'red' }} variant="subtitle1">
                  {timeAgo}
                </Typography>
              </Box>
              <Typography variant="subtitle1">Table No : {data.tableNo}</Typography>
              <Typography variant="subtitle1">Customer Name : Rinto Davis </Typography>
            </Stack>

            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1, color: 'red' }}>
                Order Details
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
              <CashierInvoiceTable data={items} />
            </Stack>

            <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1, color: 'red' }}>
                Add Ons
              </Typography>
            </Stack>

            {addOns && <CashierIAddonsTable data={addOns} />}
          </Stack>

          <Box>
            <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle1">{data.subtotalAmount}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">SGST @ 2.5 % </Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">{data.sgst}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">CGST @ 2.5 %</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">{data.cgst}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">Additional Charges ( AC )</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">100.00</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">Gross Amount</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">{data.totalAmount}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1">Rounded</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle1">{data.discount}</Typography>
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
                <Typography variant="subtitle2">{parseInt(data.totalAmount, 10)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', padding: '8px' }}>
              {isverified && (
                <Button
                  variant="contained"
                  disabled={!allOderComplete}
                  sx={
                    allOderComplete
                      ? {
                          backgroundColor: '#BB3138',
                          color: 'white',
                          borderRadius: '8px',
                          border: '2px solid white',
                          boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                        }
                      : {}
                  }
                >
                  Complete Order
                </Button>
              )}
            </Box>
          </Box>
        </Scrollbar>

        <Box sx={{ p: 2.5, backgroundColor: '#F5F5F5', minHeight: '49px' }}>
          {/* <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={onResetFilter}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button> */}
        </Box>
      </Drawer>
    </>
  );
}

export default OrderCashierDrawer;
