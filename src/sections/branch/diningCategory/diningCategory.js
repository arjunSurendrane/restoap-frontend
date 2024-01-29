import PropTypes, { number, string } from 'prop-types';
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
  Checkbox,
  TableRow,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  TableCell,
  DialogContent,
  InputAdornment,
  Grid,
  LinearProgress,
  FormControlLabel,
  Switch,
  Skeleton,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { styled } from 'styled-components';
import SvgColor from '../../../components/svg-color/SvgColor';
import { useDispatch, useSelector } from '../../../redux/store';
import {
  getDiningCategories,
  createDiningCategory,
  deleteDiningCategory,
  updateDiningCategory,
} from '../../../redux/slices/diningCategory';
import { CloseIcon } from '../../../theme/overrides/CustomIcons';
import API from '../../../utils/axios';
import { RHFTextField } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
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
import { TableToolbar, TableRows } from '../../list';
import { useAuthContext } from '../../../auth/useAuthContext';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import DeletePopUp from '../../../components/PopUp/DeletePopUp';
import { getTables } from '../../../redux/slices/table';
import {
  StyledActionsBox,
  StyledAddButton,
  StyledEditButton,
} from '../../../theme/overrides/Button';

// ----------------------------------------------------------------------

DiningCategoryDialog.propTypes = {
  onClose: PropTypes.func,
  setCategoryId: PropTypes.func,
  notifyError: PropTypes.func,
  diningCategories: PropTypes.any,
};

export default function DiningCategoryDialog({ onClose, notifyError, ...other }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiningCategories(id));
  }, [dispatch, id]);
  const { diningCategories, isLoadingDiningCategories } = useSelector(
    (state) => state.diningCategory
  );
  const { user } = useAuthContext();
  const [isEdit, setIsEdit] = useState(false);
  const [apiError, setApiError] = useState('');
  const [editObject, setEditObject] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredRowDelete, setHoveredRowDelete] = useState(null);
  const [defaultValues, setDefaultValues] = useState({
    categoryName: '',
    additionalCharge: '',
  });
  const [catName, setCatName] = useState('');
  const [additional, setAdditional] = useState('');
  const [loading, setLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [storeId, setStoreId] = useState('');
  const SkeltonCount = ['1', '2', '3', '4', '5'];

  const handleEditClick = (category) => {
    setIsEdit(true);
    setEditObject(category);
  };

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  const handleMouseEnterDelete = (rowIndex) => {
    setHoveredRowDelete(rowIndex);
  };

  const handleMouseLeaveDelete = () => {
    setHoveredRowDelete(null);
  };

  useEffect(() => {
    setDefaultValues({
      categoryName: isEdit ? editObject.name.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
      additionalCharge: isEdit ? editObject.additionalCharge : '',
    });
    setCatName(isEdit ? editObject.name.replace(/\b\w/g, (char) => char.toUpperCase()) : '');
    setAdditional(isEdit ? editObject.additionalCharge : '');
  }, [isEdit, editObject]);

  const AddDiningCategorySchema = Yup.object().shape({
    categoryName: Yup.string()
      .required('Category name is required')
      .matches(/^[^0-9]+$/, 'Category name cannot contain numbers')
      .trim(),
    additionalCharge: Yup.string()
      .required('Additional charge is Required')
      .matches(/^(\d+(\.\d{0,2})?|\.\d{1,2})$/, 'Percentage between 0 and 100')
      .test('is-between-0-100', 'Percentage must be in between 0% and 100%', (value) => {
        if (!value) return true;
        const numericValue = parseFloat(value);
        return numericValue >= 0 && numericValue <= 100;
      }),
  });

  const methods = useForm({
    resolver: yupResolver(AddDiningCategorySchema),
    defaultValues,
  });
  const {
    reset,
    resetField,
    setError,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data, event) => {
    // setLoading(true);
    setApiError(false);
    event.preventDefault();
    const submitValues = {
      store: user.storeId ? user.storeId : id,
      name: data?.categoryName,
      additionalCharge: data?.additionalCharge,
    };
    try {
      const res = await dispatch(createDiningCategory(submitValues));
      notifyError(res.data.message);
      reset();
      resetField();
    } catch (error) {
      console.error(error);
      reset();
      setApiError(error.response.data.message);
      notifyError(error.response.data.message);
    }
  };

  const editSubmission = async () => {
    setApiError(false);

    const submitValues = {
      store: user.storeId ? user.storeId : id,
      name: catName,
      additionalCharge: additional,
    };
    try {
      const res = await dispatch(updateDiningCategory(editObject.id, submitValues));
      if (res.code === 409) {
        notifyError(res.message);
      }

      reset();
      resetField();
      setLoading(false);
      setIsEdit(false);
    } catch (error) {
      console.error(error);
      notifyError(error.response.data.message);
      reset();
    }
  };

  const handleDeleteClick = async (diningCategoryId, StoreId) => {
    try {
      const response = await dispatch(deleteDiningCategory(diningCategoryId, StoreId));
      if (`${response.code}`.startsWith('4')) {
        notifyError(response.message);
      }
      setCatName('');
      setAdditional('');
      reset();
      resetField();
    } catch (error) {
      notifyError(error.response.data.message);
      reset();
    }
  };

  const handleDelete = (data) => {
    setStoreId(data.store);
    setCategoryId(data.id);
    setOpenPopUp(true);
  };

  const handleDisable = async (row) => {
    const data = {
      active: !row.active,
      name: row.name,
      store: row.store,
      additionalCharge: row.additionalCharge,
    };
    await dispatch(updateDiningCategory(row.id, data));
    await dispatch(getTables(row.storeId));
  };

  const [openPopover, setOpenPopover] = useState(null);
  const categoryArray = [];
  // eslint-disable-next-line array-callback-return
  diningCategories.map((name) => {
    categoryArray.push(name.name);
  });
  const tableData = diningCategories;
  const [isNotFound, setIsNotFound] = useState(false);
  useEffect(() => {
    if (tableData.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [tableData.length]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Reset the form
    }
  }, [isSubmitSuccessful, reset]);

  const TABLE_HEAD = [
    // { id: '' },
    { id: 'diningtype', label: 'Dining categories', align: 'left' },
    { id: 'additionalCharge', label: 'Additional Charge', align: 'left' },
    { id: 'actions', label: 'Enable/Disable', align: 'left' },
    { id: 'actions', label: 'Actions', align: 'left' },
  ];

  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const tableSkeltonCount = [1, 2, 3];

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const cancelClick = () => {
    reset();
    setDefaultValues({
      categoryName: '',
      additionalCharge: '',
    });
    setCatName('');
    setAdditional('');
    setIsEdit(false);
    setApiError('');
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

  return (
    <>
      <ToastContainer />
      <DeletePopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        setConfirmDelete={handleDeleteClick}
        itemId={categoryId}
        storeId={storeId}
        // content="Are you sure you want to delete? You can't undo this action."
      />
      <Dialog
        onClose={() => {
          onClose();
          reset();
          setIsEdit(false);
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
              backgroundColor: '#BB3138',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
              height: 40,
              color: 'white',
              alignContent: 'center',
            }}
          >
            Dining categories
            <Box sx={{ ':hover': { cursor: 'pointer' }, marginTop: '5px', marginRight: '-5px' }}>
              <Iconify
                width="2rem"
                color="#fff"
                icon="mdi:close-box"
                onClick={() => {
                  onClose();
                  reset();
                  setIsEdit(false);
                }}
              />
            </Box>
          </DialogTitle>
          <DialogContent sx={{ overflow: 'unset', marginBottom: '16px' }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    {isEdit ? (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <RHFTextField
                            size="small"
                            sx={{ width: '300px' }}
                            name="categoryName"
                            label="Category Name"
                            onChange={(e) => setCatName(e.target.value)}
                            value={catName}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <RHFTextField
                            size="small"
                            sx={{ width: '300px' }}
                            name="additionalCharge"
                            label="Additional Charge (%)"
                            onChange={(e) => setAdditional(e.target.value)}
                            value={additional}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <RHFTextField
                            size="small"
                            name="categoryName"
                            label="Category Name"
                            sx={{ width: '300px' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <RHFTextField
                            size="small"
                            name="additionalCharge"
                            label="Additional Charge (%)"
                            sx={{ width: '300px' }}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {apiError && (
                      <h6 style={{ color: '#FF5630', fontSize: '0.75rem', fontWeight: 400 }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{apiError}
                      </h6>
                    )}
                  </Stack>
                </Grid>
                {/* <Grid item xs={8} md={10} alignItems="center" /> */}
                <Grid item xs={4} md={12} alignItems="center" justifyContent="end">
                  <Stack spacing={3} sx={{ pt: 0.5, alignItems: 'end' }}>
                    {!isEdit ? (
                      <StyledAddButton
                        type="submit"
                        variant="contained"
                        sx={{ width: '100px' }}
                        loading={isSubmitting || isSubmitSuccessful}
                      >
                        Add
                      </StyledAddButton>
                    ) : (
                      <StyledEditButton
                        fullWidth
                        size="large"
                        variant="contained"
                        loading={loading}
                        sx={{ width: '100px' }}
                        onClick={() => editSubmission()}
                      >
                        Update
                      </StyledEditButton>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContent>
          <DialogContent sx={{ overflow: 'unset' }}>
            <Stack spacing={3}>
              <Card sx={{ borderRadius: '8px', border: '3px solid #BB3138' }}>
                <Table size="small" sx={{ minWidth: 500 }}>
                  <TableHeadCustom headLabel={TABLE_HEAD} />

                  <TableBody>
                    {tableData?.map((row, rowIndex) => (
                      <StyledTableRow key={rowIndex} hover>
                        <TableCell sx={{ borderRight: '2px solid white' }} align="left">
                          {row.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </TableCell>

                        <TableCell sx={{ borderRight: '2px solid white' }} align="left">
                          {row.additionalCharge}%
                        </TableCell>
                        <TableCell sx={{ borderRight: '2px solid white' }} align="left">
                          <FormControlLabel
                            control={
                              <Switch onClick={() => handleDisable(row)} checked={row.active} />
                            }
                            sx={{
                              pl: 2,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderRight: '2px solid white' }} align="left">
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Edit">
                              <StyledActionsBox
                                onClick={() => handleEditClick(row)}
                                onMouseEnter={() => handleMouseEnter(rowIndex)}
                                onMouseLeave={handleMouseLeave}
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
                            </Tooltip>

                            <Tooltip title="Delete">
                              <StyledActionsBox
                                onClick={() => handleDelete(row)}
                                onMouseEnter={() => handleMouseEnterDelete(rowIndex)}
                                onMouseLeave={handleMouseLeaveDelete}
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
                            </Tooltip>
                          </Box>
                        </TableCell>
                        {/* )} */}
                      </StyledTableRow>
                    ))}
                    {isLoadingDiningCategories && tableData.length === 0 && (
                      <>
                        {tableSkeltonCount.map((value) => (
                          <StyledTableRow>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </>
                    )}

                    {/* <TableEmptyRows /> */}
                    {!isLoadingDiningCategories && tableData.length === 0 && (
                      <StyledTableRow sx={{ display: 'contents' }}>
                        <TableNoData
                          isNotFound={isNotFound}
                          text="No Dining Category Added"
                          description="You haven't added any  Dining Category in your store yet."
                        />
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </Stack>
          </DialogContent>
          {/* <DialogActions /> */}
        </Box>
      </Dialog>
    </>
  );
}
