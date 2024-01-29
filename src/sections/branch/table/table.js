/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import PropTypes, { any, bool, func, string } from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
  Typography,
  Container,
  IconButton,
  TableContainer,
  Stack,
  Checkbox,
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
  FormHelperText,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { getTables, createTable, updateTable } from '../../../redux/slices/table';
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
import { TableToolbar, TableRows, TableModalToolbar } from '../../list';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { useAuthContext } from '../../../auth/useAuthContext';
import {
  StyledActionsBox,
  StyledAddButton,
  StyledCancelButton,
  StyledEditButton,
} from '../../../theme/overrides/Button';

// ----------------------------------------------------------------------

AddTableModal.propTypes = {
  onClose: PropTypes.func,
  diningCategories: any,
  handleFilterDiningCategory: func,
  tName: any,
  catId: any,
  editTable: bool,
  tableId: any,
  storeId: string,
  setEditTable: func,
  setOpenTableModal: func,
};

export default function AddTableModal({
  onClose,
  diningCategories,
  handleFilterDiningCategory,
  tName,
  catId,
  editTable,
  tableId,
  storeId,
  setEditTable,
  setOpenTableModal,
  ...other
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useAuthContext();

  const [openPopover, setOpenPopover] = useState(null);
  const filteredDiningCategories = diningCategories?.filter((data) => data.active === true);

  const categoryArray = [];
  // eslint-disable-next-line array-callback-return
  diningCategories.map((name) => {
    categoryArray.push(name.name);
  });

  const [defaultValues, setDefaultValues] = useState({
    tableName: '',
    categoryName: '',
  });

  const [tableName, setTableName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [CID, setCID] = useState('');
  const [catError, setCatError] = useState('');
  const [tableError, setTableError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  // let categoryId = '';
  if (tName && catId && !tableName && !CID) {
    // tabName = tName;]
    setIsEdit(true);
    setTableName(tName);
    setCID(catId);
    setCategoryName(catId);
  }

  // const isTableNameUnique = (tableNames) => (value) => {
  //   if (!value) {
  //     return true;
  //   }
  //   return !tableNames.includes(value);
  // };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryName: editTable ? catId?.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
      tables: [
        {
          tableName: editTable ? tName.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
        },
      ],
    },
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required('Dining Category is required'),
      tables: Yup.array().of(
        Yup.object().shape({
          tableName: Yup.string()
            .required('Table No is required')
            .max(20, 'Table No must be at most 20 characters'),
          // .test(
          //   'is-unique',
          //   'Table Name must be unique',
          //   isTableNameUnique([]) // Pass an empty array initially
          // ),
        })
      ),
    }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('working in table add');
      try {
        if (editTable) {
          // console.log('values in edit storeId', values);
          const tables = values.tables.map((val) => ({
            name: val.tableName,
            tableId,
            dineCategory: values.categoryName,
            storeId: user.storeId ? user.storeId : params.id,
          }));
          const res = await dispatch(updateTable({ tables }));
          console.log('res in table update', res);
          if (res.data.code === 409) {
            toast.error(res.data.message);
          }

          resetForm();
          setEditTable(false);
          setOpenTableModal(false);
          onClose();
        } else {
          const tables = values.tables.map((val) => ({
            name: val.tableName,
            dineCategory: values.categoryName,
            storeId: user.storeId ? user.storeId : params.id,
          }));

          const response = await dispatch(createTable({ tables }));
          console.log({ response });
          if (response.status === 201) {
            resetForm();
            onClose();
          } else if (`${response.code}`.startsWith('4')) {
            console.log('here');
            toast.error(response.message);
          } else {
            toast.error('something gone wrong');
          }
        }
      } catch (err) {
        console.log('error', err);
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

  const tableData = categoryArray;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleFilterRole = (event) => {
    // setPage(0);
    console.log('FILTER NAME', event.target.value);
    // setFilterName(event.target.value);
  };

  useEffect(() => {
    setCatError('');
    setTableError('');
  }, []);

  const [load, setLoad] = useState(false);
  const [dummyDefault, setDummyDefault] = useState('dsgfh');

  const cancelClick = () => {
    setTableName('');
    setCategoryName(false);
    setIsEdit(false);
  };
  console.log('touched.categoryName', touched?.categoryName);
  console.log('touched.categoryName', errors?.categoryName);

  return (
    <Dialog
      // maxWidth="sm"
      onClose={() => {
        onClose();
        resetForm();
      }}
      {...other}
      sx={{ borderRadius: '8px' }}
      maxheight="20px"
      maxWidth="660px"
      PaperProps={{
        sx: {
          borderRadius: '8px',
        },
      }}
    >
      <Box sx={{ width: '660px', borderRadius: '8px', marginBottom: '21px' }}>
        <DialogTitle
          sx={{
            height: '55px',
            backgroundColor: '#BB3138',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#FFF',
            fontFamily: 'Public Sans',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
          }}
        >
          {editTable ? 'Update Table' : 'Add Table'}
          <Box sx={{ ':hover': { cursor: 'pointer' }, marginTop: '5px', marginRight: '-5px' }}>
            <Iconify
              width="2rem"
              color="#fff"
              icon="mdi:close-box"
              onClick={() => {
                onClose();
                resetForm();
              }}
            />
          </Box>
        </DialogTitle>
        <Box padding="21px" width="660px">
          {/* <DialogContent sx={{ overflow: 'unset', marginBottom: '2rem' }}> */}
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={editTable ? 12 : 11} lg={editTable ? 12 : 11}>
                  <FormControl size="small" sx={{ width: editTable ? '619px' : '560px' }}>
                    <InputLabel id="demo-select-small-label">Dining Category</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      name="categoryName"
                      label="Dining Category"
                      value={values.categoryName}
                      onChange={handleChange}
                      error={Boolean(touched?.categoryName && errors?.categoryName)}
                      helperText={touched.categoryName && errors.categoryName}
                    >
                      {filteredDiningCategories?.map((val) => (
                        <MenuItem value={val.id}>
                          {val.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched?.categoryName && errors?.categoryName && (
                      <FormHelperText error>{errors?.categoryName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <FieldArray name="tables">
                  {(arrayHelpers) => (
                    <Grid item xs={12} sm={12} md={12}>
                      <Grid container spacing={2}>
                        {values?.tables?.map((data, index) => (
                          <Grid item xs={12} md={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={editTable ? 12 : 11} lg={editTable ? 12 : 11}>
                                <TextField
                                  label="Table No"
                                  size="small"
                                  sx={{ width: editTable ? '619px' : '560px', marginBottom: '9px' }}
                                  name={`tables[${index}].tableName`}
                                  onChange={handleChange}
                                  value={data.tableName}
                                  error={Boolean(
                                    touched.tables?.[index]?.tableName &&
                                      errors.tables?.[index]?.tableName
                                  )}
                                  helperText={
                                    touched.tables?.[index]?.tableName &&
                                    errors.tables?.[index]?.tableName
                                  }
                                />
                              </Grid>
                              {index !== 0 && values.tables.length - 1 === index && (
                                <Grid item xs={12} md={1}>
                                  <Box sx={{ flexShrink: 0 }}>
                                    <Tooltip title="Delete">
                                      <StyledActionsBox
                                        sx={{
                                          backgroundColor: '#BB3138',
                                          width: '40px',
                                          height: '40px',
                                          padding: '8px',
                                        }}
                                        size="small"
                                        variant="contained"
                                        onClick={() =>
                                          arrayHelpers.remove(values.tables.length - 1)
                                        }
                                      >
                                        <img
                                          src="/assets/icons/branch/deleteIcon.svg"
                                          alt="delete icon"
                                          height="18px"
                                          width={25}
                                        />
                                      </StyledActionsBox>
                                    </Tooltip>
                                  </Box>
                                </Grid>
                              )}
                              {!editTable && values.tables.length - 1 === index && (
                                <Grid item xs={12} md={12} alignItems="center">
                                  <Button
                                    onClick={() =>
                                      arrayHelpers.push({ tableName: '', categoryName: '' })
                                    }
                                    variant="outlined"
                                    sx={{
                                      borderRadius: '8px',
                                      border: '2px solid #BB3138',
                                      marginTop: '21px',
                                    }}
                                  >
                                    <Iconify icon="eva:plus-fill" />
                                    New Table
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
                {/* <Grid item xs={6} md={7} alignItems="center" /> */}
                <Grid item xs={12} md={12} alignItems="center" sx={{ marginRight: '10px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <StyledCancelButton
                      variant="outlined"
                      onClick={() => {
                        onClose();
                        resetForm();
                      }}
                      sx={{
                        height: '40px',
                        width: '100px',
                        marginRight: '5px',
                      }}
                    >
                      Cancel
                    </StyledCancelButton>
                    <Stack spacing={3} justifyContent="flex-end">
                      {editTable ? (
                        <StyledEditButton
                          // fullWidth
                          size="small"
                          type="submit"
                          variant="contained"
                          sx={{
                            height: '40px',
                            width: '100px',
                          }}
                          loading={isSubmitting}
                        >
                          Update
                        </StyledEditButton>
                      ) : (
                        <StyledAddButton
                          // fullWidth
                          size="small"
                          type="submit"
                          variant="contained"
                          sx={{
                            height: '40px',
                            width: '100px',
                          }}
                          loading={isSubmitting}
                        >
                          Add
                        </StyledAddButton>
                      )}
                    </Stack>
                  </Box>
                </Grid>
                {/* <Grid item xs={6} md={2} alignItems="center"> */}

                {/* </Grid> */}
              </Grid>
            </Form>
          </FormikProvider>
          {/* </DialogContent> */}
        </Box>
      </Box>
    </Dialog>
  );
}
