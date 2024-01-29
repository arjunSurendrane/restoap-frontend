import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import { LoadingButton } from '@mui/lab';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Grid,
  Stack,
  Card,
  Button,
  Select,
  Popover,
  MenuItem,
  FormControlLabel,
  Switch,
  InputLabel,
  FormControl,
  TextField,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

// import { makeStyles } from '@mui/styles';
import { PATH_DASHBOARD } from '../../routes/paths';

// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../../redux/slices/category';
import { getRoles } from '../../redux/slices/role';
import { useAuthContext } from '../../auth/useAuthContext';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../components/hook-form';
import CustomizedTables from '../../components/table/MuiCustomTable';
import SvgColor from '../../components/svg-color/SvgColor';
import BasicPagination from '../../components/pagination/pagination';
import MenuCategoryForm from '../../sections/menu/menuCatalogue/AddMenuCategoryForm';
import HasPermission from '../../auth/RightGuard';
import { TableNoData } from '../../components/table';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import Iconify from '../../components/iconify';
// import { RowingTwoTone } from '@mui/icons-material';
// import Select from 'src/theme/overrides/Select';

// ----------------------------------------------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '2px solid white',
    '&:last-child td, &:last-child th': {
      borderRight: '2px solid black',
    },
  },
}));

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
export default function MenuCategory() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const stores = [];
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const notifyError = (message) => toast.error(message);
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { categories, isLoadingCategory } = useSelector((state) => state.category);
  const { roles } = useSelector((state) => state.role);
  const [storeData, setStoreData] = useState('');
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState({});
  const [category, setCategory] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState({ status: '', id: '' });
  const isNotFound = !categories?.results?.length;
  const [count, setCount] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [limit, setLimit] = useState(5);
  const [defaultStore, setDefaultStore] = useState('');

  const SkeltonCount = ['1', '2', '3', '4', '5'];
  const notifySuccess = (message) => toast.success(message);

  useEffect(() => {
    const Limit = 1000;
    dispatch(getBranches(Limit));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const firstStoreId = branches.results?.[0]?.id || null;
  const defaultBranch = user.storeId ? user.storeId : firstStoreId;
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    setStoreId(defaultBranch);
  }, [defaultBranch]);
  useEffect(() => {
    dispatch(getCategories(defaultBranch, storeId, page, limit));
  }, [dispatch, defaultBranch, storeId, page, limit]);

  // categories.map((data)=>(

  // ))
  branches?.results?.forEach((data) => {
    if (data.isActive) {
      stores.push({ id: data.id, store: data.location });
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // delete category function
  const handleDelete = async (categoryId, store) => {
    setStoreId(storeId);
    const res = await dispatch(deleteCategory(categoryId, storeId));
    if (res.status === 404) {
      notifyError(res.data.message);
    } else if (res.status === 201) {
      notifyError(res.data.message);
    }
  };
  const handleEdit = async (data) => {
    setCategory(data.id);
    setEdit(true);
    setEditValue(data);
  };

  const handleChangeActive = async (row) => {
    const data = {
      name: row.name,
      active: !row.active,
      store: row.store.id,
    };

    await dispatch(updateCategory(row.id, data, page, limit));
  };

  return (
    <>
      <Helmet>
        <title>Restoap | Menu Category</title>
      </Helmet>
      <ToastContainer />
      <CustomBreadcrumbs
        heading="Menu"
        iconName="/assets/icons/navbar/MenuIcon_Vector.svg"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Menu',
            href: PATH_DASHBOARD.menu.menuList,
          },
          { name: 'Menu Category' },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MenuCategoryForm
            edit={edit}
            editValue={editValue}
            setEdit={setEdit}
            count={count}
            notifySuccess={notifySuccess}
            notifyError={notifyError}
            setStoreId={setStoreId}
            page={page}
            limit={limit}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3 }}>
            <Stack marginTop="5px" spacing={3} mb={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">Menu Category List</Typography>
                <HasPermission permissionKey="GRANT_PERMISSION">
                  {/* <Button
                    aria-describedby={id}
                    onClick={handleClick}
                    startIcon={<FilterListIcon size="medium" />}
                    variant="contained"
                  /> */}
                  {/* <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  > */}
                  {stores.length > 0 && (
                    <FormControl sx={{ minWidth: '150px' }}>
                      <InputLabel id="demo-simple-select-label">Select store</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={storeId}
                        label="Select store"
                        onChange={(e) => {
                          setStoreId(e.target.value);
                          setCount(count + 1);
                          setEdit(false);
                        }}
                      >
                        {stores?.map((data) => (
                          <MenuItem value={data.id}>{data.store}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {/* </Popover> */}
                </HasPermission>
              </Box>

              <CustomizedTables
                tableLabels={[
                  { id: 'cataloguename', label: 'Category Name' },
                  { id: 'storename', label: 'Store Name' },
                  { id: 'enable/disable', label: 'Enable/Disable' },
                  { id: 'action', label: 'Actions' },
                ]}
              >
                {categories?.results?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <>
                      <StyledTableCell component="th" scope="row">
                        {row.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.store.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        <FormControlLabel
                          control={
                            <Switch checked={row.active} onClick={() => handleChangeActive(row)} />
                          }
                          sx={{
                            pl: 2,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <HasPermission permissionKey="MENU_UPDATE">
                            <Box
                              onClick={() => handleEdit(row)}
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
                            </Box>
                          </HasPermission>

                          <HasPermission permissionKey="MENU_DELETE">
                            <Box
                              onClick={() => {
                                setOpenPopUp(true);
                                setCategory(row.id);
                              }}
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
                            </Box>
                          </HasPermission>
                        </Box>
                      </StyledTableCell>
                    </>
                  </StyledTableRow>
                ))}
                {/* {isLoadingCategory &&
                  
                    (
                      <>
                        {SkeltonCount?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <Skeleton animation="wave" />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Skeleton animation="wave" />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Skeleton animation="wave" />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </>
                    )} */}
                {!isLoadingCategory &&
                  (categories?.length === 0 || categories?.results?.length === 0) && (
                    <TableNoData
                      isNotFound={isNotFound}
                      text="No Category Added"
                      description="You haven't added any Category in your store yet"
                    />
                  )}
              </CustomizedTables>

              {categories?.results?.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    mt: 3,
                  }}
                >
                  <BasicPagination
                    count={categories.totalPages}
                    page={page}
                    fun={setPage}
                    setLimit={setLimit}
                    totalResults={categories.totalResults}
                    limit={limit}
                  />
                </Box>
              )}
              <DeletePopUp
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
                setConfirmDelete={handleDelete}
                itemId={category}
                storeId={defaultBranch}
                content="Are You Sure want To Delete"
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
