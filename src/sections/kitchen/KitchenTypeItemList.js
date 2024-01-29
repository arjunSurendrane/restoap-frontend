/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';
import { useParams } from 'react-router';

// @mui
import {
  Box,
  Card,
  Table,
  Select,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  TableContainer,
  Grid,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  FormControl,
  RadioGroup,
  Radio,
  InputLabel,
  FormHelperText,
  Checkbox,
  TextField,
  InputAdornment,
} from '@mui/material';

import { styled } from 'styled-components';
import SvgColor from '../../components/svg-color/SvgColor';
import CustomButton from '../../components/button/CustomButton';
import HasPermission from '../../auth/RightGuard';
import { useAuthContext } from '../../auth/useAuthContext';
// utils
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import {
  getKitchens,
  deleteKitchen,
  updateKitchen,
  assignItemsToKitchen,
} from '../../redux/slices/kitchen';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom } from '../../components/table';
import BasicPagination from '../../components/pagination/pagination';
import {
  StyledActionsBox,
  StyledAddButton,
  StyledCancelButton,
} from '../../theme/overrides/Button';
import { getMenus } from '../../redux/slices/menu';
import { getCategories } from '../../redux/slices/category';

// ----------------------------------------------------------------------

KitchenItemListTable.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
  setEdit: PropTypes.func,
  setEditValues: PropTypes.func,
  setStore: PropTypes.func,
  setOpenPopUp: PropTypes.func,
  setKitchen: PropTypes.func,
  setOpen: PropTypes.func,
  setDropdownValue: PropTypes.func,
  dropdownValue: PropTypes.string,
  deleteResponse: PropTypes.object,
};

export default function KitchenItemListTable({
  title,
  subheader,
  tableData,
  tableLabels,
  setEdit,
  setStore,
  setOpenPopUp,
  setKitchen,
  setEditValues,
  setOpen,
  deleteResponse,
  setDropdownValue,
  dropdownValue,
  ...other
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useAuthContext();
  const [page, setPage] = useState(1);
  // const { branches } = useSelector((state) => state.branch);
  const { categories } = useSelector((state) => state.category);

  const { menus, isLoadingMenuItems } = useSelector((state) => state.menu);
  const { kitchens } = useSelector((state) => state.Kitchen);
  const [limit, setLimit] = useState(5);
  const [itemsId, setItemsId] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('all');
  const totalPage = Math.ceil(kitchens.length / limit);
  console.log('pacategoryrams', category);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const limit = 1000;
    dispatch(getBranches(limit));
    dispatch(getCategories(params.store));
    // setDropdownValue(dropdownValue === '' ? branches[0]?.id : dropdownValue);
  }, [dispatch, params.store]);
  useEffect(() => {
    setDropdownValue(params.store);
  }, [params.store, setDropdownValue]);

  useEffect(() => {
    setCategory('all');
  }, [params.store]);

  useEffect(() => {
    if (dropdownValue) {
      const sortValue = '';
      let categoryName = '';
      if (category === 'all') {
        categoryName = '';
      } else {
        categoryName = category;
      }

      dispatch(
        getMenus(dropdownValue, searchValue, dropdownValue, categoryName, page, sortValue, limit)
      );
    }
  }, [dispatch, dropdownValue, searchValue, page, limit, category]);

  return (
    <Card {...other} sx={{ padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      {/* <CardHeader
        // title={title}
        // subheader={subheader}
        sx={{ mb: 3 }}
        action={
          
        }
      /> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingInline: '12px',
          marginBottom: '20px',
        }}
      >
        <TextField
          // fullWidth
          size="small"
          sx={{ width: '445px' }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setStore(e.target.value);
              setPage(1);
            }}
            // displayEmpty
            size="small"
            // minWidth='200px'
            sx={{ minWidth: '200px' }}
          >
            <MenuItem value="all">All</MenuItem>
            {categories?.results
              ?.filter((val) => val.active)
              ?.map((val) => (
                <MenuItem value={val.id}>
                  {val.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>

      <TableContainer sx={{ overflow: 'unset', paddingInline: '10px' }}>
        <Card sx={{ borderRadius: '8px', border: '3px solid #BB3138' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {menus?.results?.map((data) => (
                  <KitchenListTableRow
                    key={data.id}
                    data={data}
                    storeId={dropdownValue}
                    setEdit={setEdit}
                    setEditValues={setEditValues}
                    setOpenPopUp={setOpenPopUp}
                    setKitchen={setKitchen}
                    setOpen={setOpen}
                    deleteResponse={deleteResponse}
                    setItemsId={setItemsId}
                    dropdownValue={dropdownValue}
                    searchValue={searchValue}
                    category={category}
                    page={page}
                    //  sortValue={sortValue}
                    limit={limit}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </TableContainer>

      {/* <Divider /> */}

      <Box sx={{ display: 'flex', justifyContent: 'end', padding: '1rem' }}>
        <BasicPagination
          count={menus.totalPages}
          page={menus.page}
          fun={setPage}
          setLimit={setLimit}
          //   totalResults={menus.totalResults}
        />
      </Box>
      {/* <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <StyledAddButton>Move Items</StyledAddButton>
      </Box> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

KitchenListTableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.number,
    store: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
    categoryName: PropTypes.string,
    storeId: PropTypes.string,
    kitchen: PropTypes.string,
    foodCategory: PropTypes.string,
  }),
  storeId: PropTypes.string,
  setEdit: PropTypes.string,
  setEditValues: PropTypes.func,
  setOpenPopUp: PropTypes.func,
  setKitchen: PropTypes.func,
  setOpen: PropTypes.func,
  deleteResponse: PropTypes.object,
  setItemsId: PropTypes.object,
  limit: PropTypes.string,
  page: PropTypes.string,
  category: PropTypes.string,
  searchValue: PropTypes.string,
};

function KitchenListTableRow({
  data,
  setEdit,
  storeId,
  setEditValues,
  setOpenPopUp,
  setKitchen,
  setOpen,
  deleteResponse,
  setItemsId,
  limit,
  page,
  category,
  searchValue,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [openPopover, setOpenPopover] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [kitchenIds, setKitchenIds] = useState([]);
  const [defaultKitchen, setDefaultKitchen] = useState({});
  const { kitchens } = useSelector((state) => state.Kitchen);
  console.log('params id', kitchens);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleDelete = async () => {
    setKitchen({ id: data.id, store: storeId });
    await setOpenPopUp(true);
    // handleClosePopover();
    console.log('DELETE in kitchen-type', data.id, storeId);

    // const response = await dispatch(deleteKitchen(data.id, storeId));
    // console.log('response in desdjkhfkjshd', response);
    if (deleteResponse.status === 409) {
      console.log('deleteResponse');
      setOpenDeleteModal(true);
    }
  };
  const handleEdit = () => {
    // handleClosePopover();
    // setOpen(true);
    setEdit(true);
    setEditValues(data);
    console.log('Edit', data.id);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F4F4F4;',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#E6E6E6;',
    },
    // hide last border  #E6E6E6;
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));

  // eslint-disable-next-line no-shadow
  const handleDisable = async (data) => {
    setKitchen({ id: data.id, store: storeId });
    console.log('disbale in kitchen', data);
    const newData = {};
    newData.isActive = !data.isActive;
    newData.store = data.store;
    newData.id = data.id;
    newData.name = data.name;

    const response = await dispatch(updateKitchen(newData));
    console.log('edit addon response', response);
    if (`${response.status}`.startsWith('2')) {
      const message = 'success';
      toast.success(message);
      setEdit(false);
      // setOpen(false);
      // setEdit(false);
    }
    if (response.data.code === 409) {
      setOpen(true);
      // toast.error(response.data.message);
    }
  };

  // eslint-disable-next-line no-shadow
  const handleCheck = async (e, data) => {
    console.log('working in checkbox', e);
    // data.kitchen = params.id
    const dataDetails = {};
    if (e.target.checked) {
      console.log('checked');
      dataDetails.kitchen = params.id;
    } else {
      // eslint-disable-next-line array-callback-return
      const defaultKitchens = kitchens?.filter((kitchen) => kitchen.isDefault);
      console.log('unchecked', defaultKitchens);
      if (defaultKitchens.length > 0) {
        setDefaultKitchen(defaultKitchens);
        dataDetails.kitchen = defaultKitchens[0].id;
      } else {
        dataDetails.kitchen = null;
      }
    }

    const sortValue = '';
    let categoryName = '';
    if (category === 'all') {
      categoryName = '';
    } else {
      categoryName = category;
    }
    await dispatch(assignItemsToKitchen(data.id, dataDetails));
    await dispatch(
      getMenus(data.storeId[0], searchValue, data.storeId[0], categoryName, page, sortValue, limit)
    );
  };

  // useEffect(() => {
  //   setKitchenIds((oldArray) => [...oldArray, data.kitchen]);
  // }, [data.kitchen]);

  // console.log('kitchenIds', kitchenIds);

  return (
    <StyledTableRow>
      <TableCell sx={{ width: '20px' }}>
        <FormControlLabel
          control={
            <Checkbox
              {...label}
              checked={params.id === data.kitchen}
              onChange={(e) => handleCheck(e, data)}
            />
          }
          sx={{
            pl: 2,
          }}
        />
      </TableCell>
      <TableCell>{data?.name?.replace(/\b\w/g, (char) => char.toUpperCase())}</TableCell>
      <TableCell
        sx={{
          borderLeft: '2px solid white',
        }}
      >
        {data?.categoryName?.replace(/\b\w/g, (char) => char.toUpperCase())}
      </TableCell>
      <TableCell
        align="start"
        sx={{
          borderLeft: '2px solid white',
        }}
      >
        {data?.foodCategory?.replace(/\b\w/g, (char) => char.toUpperCase())}
      </TableCell>
    </StyledTableRow>
  );
}
