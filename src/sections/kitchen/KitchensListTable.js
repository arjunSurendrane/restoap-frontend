/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';

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
} from '@mui/material';

import { styled } from 'styled-components';
import SvgColor from '../../components/svg-color/SvgColor';
import CustomButton from '../../components/button/CustomButton';
import HasPermission from '../../auth/RightGuard';
import { useAuthContext } from '../../auth/useAuthContext';

// utils
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { getKitchens, deleteKitchen, updateKitchen, kitchenStatus } from '../../redux/slices/kitchen';

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

// ----------------------------------------------------------------------

KitchenListTable.propTypes = {
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

export default function KitchenListTable({
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
  const { user } = useAuthContext();

  const [page, setPage] = useState(1);
  const { branches } = useSelector((state) => state.branch);
  const { kitchens } = useSelector((state) => state.Kitchen);
  const [limit, setLimit] = useState(5);
  const totalPage = Math.ceil(kitchens.length / limit);



  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const limit = 1000;
    dispatch(getBranches(limit));
    // setDropdownValue(dropdownValue === '' ? branches[0]?.id : dropdownValue);
  }, [dispatch]);
  useEffect(() => {
    setDropdownValue(user.storeId ? user.storeId : branches.results?.[0]?.id);
  }, [branches.results, setDropdownValue, user.storeId]);

  useEffect(() => {
    dispatch(getKitchens(dropdownValue));
  }, [dispatch, dropdownValue]);
  const roles = [1, 2, 3, 4];
  //   const computedValue = useMemo(
  //     () =>
  //       // Expensive computation based on value1 and value2
  //     //   dispatch(getRoles(dropdownValue)),
  //     [dispatch, dropdownValue]
  //   );

  return (
    <Card {...other} sx={{ padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ mb: 3 }}
        action={
          <HasPermission permissionKey="GRANT_PERMISSION">
            <Select
              value={dropdownValue}
              onChange={(e) => {
                setDropdownValue(e.target.value);
                setStore(e.target.value);
                setPage(1);
              }}
              // displayEmpty
              size="small"
              // sx={{minWidth:'200px'}}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {branches?.results
                ?.filter((val) => val.isActive)
                ?.map((val) => (
                  <MenuItem value={val.id}>
                    {val.location.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </MenuItem>
                ))}
            </Select>
          </HasPermission>
        }
      />

      <TableContainer sx={{ overflow: 'unset', paddingInline: '10px' }}>
        <Card sx={{ borderRadius: '8px', border: '3px solid #BB3138' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {kitchens?.slice((page - 1) * limit, page * limit)?.map((data) => (
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
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </TableContainer>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'end', padding: '2rem' }}>
        <BasicPagination
          count={totalPage}
          page={page}
          fun={setPage}
          setLimit={setLimit}
          totalResults={kitchens.length}
        />
      </Box>
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
  }),
  storeId: PropTypes.string,
  setEdit: PropTypes.string,
  setEditValues: PropTypes.func,
  setOpenPopUp: PropTypes.func,
  setKitchen: PropTypes.func,
  setOpen: PropTypes.func,
  deleteResponse: PropTypes.object,
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
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  console.log('deleteResponse', deleteResponse);
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      KitchenType: '',
      radioGroup: 'move',
    },
    // validationSchema: Yup.object().shape({
    //   KitchenType: selectedValue === 'move' && Yup.string().required('Kitchen Type is required'),
    // }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log('dgsgdj values', values);
        if (values.radioGroup === 'disable') {
          // const data = {
          //   action: values.radioGroup,
          //   status: false,
          // };
          // const response = await dispatch(kitchenStatus(kitchenId.id, data, store));
          // console.log(response, 'fdkjlgjdfkgjd');
          // if (`${response.status}`.startsWith('2')) {
          //   const message = 'success';
          //   toast.success(message);
          //   setOpen(false);
          // }
        }
        if (values.radioGroup === 'move') {
          // console.log('dgsgdj values', values);
          // // eslint-disable-next-line no-shadow
          // const data = {
          //   kitchenId: values.KitchenType,
          // };
          // const response = await dispatch(kitchenStatus(kitchenId.id, data, store));
          // if (`${response.status}`.startsWith('2')) {
          //   const message = 'success';
          //   toast.success(message);
          //   setOpen(false);
          // }
          // console.log(response, 'fdkjlgjdfkgjd');
          // if (`${response.status}`.startsWith('2')) {
          //   const message = 'success';
          //   toast.success(message);
          //   setOpen(false);
          // }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const {
    resetForm,
    setValues,
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <StyledTableRow>
      <TableCell>{data?.name?.replace(/\b\w/g, (char) => char.toUpperCase())}</TableCell>
      <TableCell
        sx={{
          borderLeft: '2px solid white',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={data?.isActive}
              // disabled={data.isDefault}
              onClick={() => handleDisable(data)}
              size="small"
              disabled={data.isDefault}
            />
          }
          sx={{
            pl: 2,
          }}
        />
      </TableCell>
      <TableCell
        align="start"
        sx={{
          borderLeft: '2px solid white',
        }}
      >
        {!data.isDefault ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <StyledActionsBox
              onClick={handleEdit}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: '#FEB700',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
              }}
            >
              <SvgColor
                sx={{ mx: 1, width: '16px', height: '16px', color: 'white' }}
                src="/assets/icons/branch/edit.svg"
                alt=""
              />
            </StyledActionsBox>

            <StyledActionsBox
              onClick={() => handleDelete()}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
              }}
            >
              <SvgColor
                src="/assets/icons/branch/Delete_Icon.svg"
                alt=""
                sx={{ color: 'white', width: '16px', height: '16px' }}
              />
            </StyledActionsBox>
            <Link to={`/dashboard/kitchen/kitchen-type/assign-menu/${data.id}/${data.store}`}>
              <CustomButton value="Assign Items" />
            </Link>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <StyledActionsBox
              // onClick={handleEdit}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: '#FEB700',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
                opacity:0.3,
              
              }}
            >
              <SvgColor
                sx={{ mx: 1, width: '16px', height: '16px', color: 'white' }}
                src="/assets/icons/branch/edit.svg"
                alt=""
              />
            </StyledActionsBox>

            <StyledActionsBox
              // onClick={() => handleDelete()}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
                opacity:0.3
              }}
            >
              <SvgColor
                src="/assets/icons/branch/Delete_Icon.svg"
                alt=""
                sx={{ color: 'white', width: '16px', height: '16px' }}
              />
            </StyledActionsBox>
            {/* <Link to={`/dashboard/kitchen/kitchen-type/assign-menu/${data.id}/${data.store}`}> */}
              {/* <CustomButton value="Assign Items" /> */}
            {/* </Link> */}
          </Box>
        )}
      </TableCell>
    </StyledTableRow>
  );
}
