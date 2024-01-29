/* eslint-disable no-nested-ternary */
/* eslint-disable */
import PropTypes, { any, func } from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// @mui
import {
  Tab,
  Box,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Stack,
  TableRow,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  TableCell,
  DialogContent,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import { getTables } from '../../../redux/slices/table';
import { useDispatch } from '../../../redux/store';
import API from '../../../utils/axios';
import { CloseIcon } from '../../../theme/overrides/CustomIcons';
import FormProvider from '../../../components/hook-form/FormProvider';
import { RHFTextField } from '../../../components/hook-form';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// components
import { TableToolbar, TableRows, TableModalToolbar } from '../../list';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';

// ----------------------------------------------------------------------

ConfirmTableDelete.propTypes = {
  onClose: PropTypes.func,
  diningCategories: any,
  handleFilterDiningCategory: func,
  tName: any,
  catId: any,
  edit: any,
  tableId: any,
};

export default function ConfirmTableDelete({
  onClose,
  diningCategories,
  handleFilterDiningCategory,
  tName,
  catId,
  edit,
  tableId,
  ...other
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const pathArray = path.split('/');
  const storeId = pathArray[pathArray.length - 1];
  console.log('store Id from CONFIRM DELETE', storeId);

  const [load, setLoad] = useState(false);
  const [err, setErr] = useState('');

  const cancelClick = () => {
    onClose();
  };

  const confirmDelete = async () => {
    setLoad(true);
    try {
      console.log('TABLE ID FROM DELETE', tableId);
      const result = await API.delete(`/table/singleTable/${tableId}`);
      console.log('RESULT AFTER DELETE', result);
      dispatch(getTables(storeId));
      setLoad(false);
    } catch (error) {
      console.log('Error is', error.response.data.message);
      setErr(error.response.data.message);
      setLoad(false);
    }
    setLoad(false);
  };

  return (
    <>
      <Dialog maxWidth="xs" maxWidth="lg" onClose={onClose} {...other}>
        <DialogTitle
          sx={{
            backgroundColor: 'FFC6C9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {' '}
          Do you really want to delete this record?{' '}
        </DialogTitle>
        {err && <h5 style={{ color: 'red' }}>{err}</h5>}

        <DialogContent sx={{ overflow: 'unset' }}>
          <Grid item xs={4} alignItems="center">
            <Stack spacing={2} justifyContent="flex-end" sx={{ pt: 0.5 }}>
              <LoadingButton
                color="inherit"
                size="large"
                variant="outlined"
                onClick={() => cancelClick()}
                loading={load}
              >
                Cancel
              </LoadingButton>
              {edit ? (
                <LoadingButton
                  fullWidth
                  // color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  //   loading={load}
                  //   onClick={() => doEdit()}
                >
                  Submit
                </LoadingButton>
              ) : (
                <LoadingButton
                  fullWidth
                  // color="inherit"
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={load}
                  onClick={() => confirmDelete()}
                >
                  Yes
                </LoadingButton>
              )}
            </Stack>
          </Grid>
          {/* </Grid> */}
          {/* </Stack> */}
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
