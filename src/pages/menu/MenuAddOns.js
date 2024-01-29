import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Button,
  styled,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import FilterListIcon from '@mui/icons-material/FilterList';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { createAddOn, getAddOns, deleteAddOn, updateAddOn } from '../../redux/slices/addOns';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import CustomizedTables from '../../components/table/MuiCustomTable';
import FormProvider, { RHFAutocomplete, RHFSwitch, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify/Iconify';
// import CommonModal from '../../components/PopUp/DeletePopUp';
import CustumPagination from '../../components/custom-pagination/Pagination';
import SvgColor from '../../components/svg-color/SvgColor';
import BasicPagination from '../../components/pagination/pagination';
import MenuAddOnForm from '../../sections/menu/menuaddOn/AddOnForm';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import { TableHeadCustom, TableNoData } from '../../components/table';
import { useAuthContext } from '../../auth/useAuthContext';
import HasPermission from '../../auth/RightGuard';
import AddOnsModal from '../../sections/menu/menuaddOn/AddOnDetailsPage';
import { StyledActionsBox, StyledBreadCrumbsButton } from '../../theme/overrides/Button';
import Scrollbar from '../../components/scrollbar/Scrollbar';

// sections
// import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  bgcolor: 'background.paper',
  borderStyle: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '2px solid white',
    // '&:last-child td, &:last-child th': {
    //   borderRight: '2px solid black',
    // },
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

export default function MenuAddOns() {
  const stores = [];
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const theme = useTheme();

  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { addOns, isAddonsLoading } = useSelector((state) => state.addOn);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState(false);
  const [variantCount, setVariantCount] = useState(['1']);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sizeNameValues, setSizeNameValues] = useState({});
  const [priceValues, setPriceValues] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [Quantity, setQuantity] = useState([]);
  const [editAddonValue, setEditAddonValue] = useState({});
  const [addOnName, setAddOnName] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const [addOnsId, setAddOnsId] = useState('');
  const [checked, setchecked] = useState();
  const [addOnModalOpen, setAddOnModalOpen] = useState(false);
  const [addOnsModalDetails, setAddOnsModalDetails] = useState({});
  const [storeId, setStoreId] = useState('');
  console.log('sahjdkajshdkj', addOnsModalDetails);
  const [imgUrl, setImgUrl] = useState(editAddonValue.image ? editAddonValue.image.path : '');

  const handleOpenModal = () => {
    setEdit(false);
    setOpen(true);
  };

  useEffect(() => {
    setStoreId(user.storeId ? user.storeId : branches.results?.[0]?.id);
  }, [branches.results, user.storeId]);
  branches?.results?.map((data) => stores.push({ id: data.id, store: data.location }));

  useEffect(() => {
    const Limit = 1000;
    dispatch(getBranches(Limit));
  }, [dispatch]);

  const defaultStore = user.storeId ? user.storeId : branches.results?.[0]?.id;

  useEffect(() => {
    console.log('limit in addons', limit);
    dispatch(getAddOns(defaultStore, storeId, page, limit));
  }, [dispatch, defaultStore, storeId, page, limit]);

  const handleClose = () => {
    setImgUrl('');
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // eslint-disable-next-line no-shadow
  const handleDelete = async (addOnId, storeId) => {
    await dispatch(deleteAddOn(addOnId, storeId));
  };

  const handleEdit = async (row) => {
    console.log('edit data', row);
    setEdit(true);
    setEditAddonValue(row);
    setOpen(true);
  };

  const FilterAddOnName = (e) => {
    setAddOnName(e.target.value);
    console.log('serch addon value', e.target.value);
  };

  const AddOnFiltered = applyFilter({
    inputData: addOns?.results,
    addOnName,
  });

  const isNotFound = !AddOnFiltered?.length;

  const handleDisable = async (row) => {
    console.log('addon enable', row);
    const data = {
      active: !row.active,
    };
    const addOnId = row?.id;
    const storeid = row?.storeId?.id;
    await dispatch(updateAddOn(addOnId, data, storeid));
  };

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const tableLabels = [
    { id: 'addOnsname', label: 'AddOns Name' },
    // { id: 'quantity', label: 'Quantity' },
    // { id: 'price', label: 'Price' },
    // { id: 'store', label: 'Store' },
    { id: 'enable/disable', label: 'Enable/Disable' },
    { id: 'actions', label: 'Actions' },
  ];
  return (
    <>
      {/* <ToastContainer /> */}
      <Helmet>
        <title>Restoap | Addons</title>
      </Helmet>
      <CustomBreadcrumbs
        heading="Menu"
        iconName="/assets/icons/navbar/MenuIcon_Vector.svg"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Menu',
            href: PATH_DASHBOARD.menu.menuList,
          },
          { name: 'AddOns' },
        ]}
        action={
          <StyledBreadCrumbsButton
            component={RouterLink}
            // to={PATH_DASHBOARD.branch.new}
            variant="contained"
            onClick={handleOpenModal}
          >
            Add AddOns
          </StyledBreadCrumbsButton>
        }
      />
      <Paper sx={{ p: isDesktop ? 4 : 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up('sm')]: {
              flexDirection: 'row',
            },
            justifyContent: 'space-between',
            mb: '10px',
            gap: 3,
          }}
        >
          <TextField
            size="small"
            sx={{
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
              width: '332px',
            }}
            onChange={FilterAddOnName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          <HasPermission permissionKey="GRANT_PERMISSION">
            {/* <Button
              aria-describedby={id}
              onClick={handleClick}
              startIcon={<FilterListIcon size="medium" />}
              variant="contained"
            /> */}

            {/* <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          > */}
            <FormControl sx={{ minWidth: '150px' }}>
              {/* <InputLabel id="demo-simple-select-label">Select store</InputLabel> */}
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={storeId}
                // label="Select store"
                onChange={(e) => setStoreId(e.target.value)}
              >
                {stores?.map((data) => (
                  <MenuItem value={data.id}>{data.store}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </HasPermission>
          {/* </Popover> */}
        </Box>
        {!isAddonsLoading && AddOnFiltered?.length > 0 && (
          <TableContainer>
            <Scrollbar>
              <Table
                size="small"
                sx={{
                  borderRadius: '8px',
                  minWidth: 800,
                  borderLeft: '2px solid #BB3138',
                  borderRight: '2px solid #BB3138',
                  borderBottom: '2px solid #BB3138',
                }}
              >
                <TableHeadCustom
                  headLabel={tableLabels}
                  // onSort={onSort}
                />
                {/* <CustomizedTables
          // tableLabels={[
          //   { id: 'addOnsname', label: 'AddOns Name' },
          //   // { id: 'quantity', label: 'Quantity' },
          //   // { id: 'price', label: 'Price' },
          //   // { id: 'store', label: 'Store' },
          //   { id: 'enable/disable', label: 'Enable/Disable' },
          //   { id: 'actions', label: 'Actions' },
          // ]}
          labelLenght={[1, 2, 3, 4]}
        > */}
                <TableBody>
                  {/* <TableRow> */}
                  {AddOnFiltered?.map((row) => (
                    <StyledTableRow key={row.name}>
                      {/* {tableLabels.map((item) => ( */}
                      <>
                        {/* {labelLenght?.map((data) => ( */}
                        <StyledTableCell component="th" scope="row" sx={{ width: '617px' }}>
                          {row.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row" sx={{ width: '162px' }}>
                          <FormControlLabel
                            control={
                              <Switch checked={row.active} onClick={() => handleDisable(row)} />
                            }
                            sx={{
                              pl: 2,
                            }}
                          />
                        </StyledTableCell>
                        <TableCell component="th" scope="row" sx={{ width: '295px' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <StyledActionsBox
                              onClick={() => handleEdit(row)}
                              sx={{
                                mx: 1,
                                // width: '35px',
                                // height: '35px',
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
                              // onClick={() => handleDelete(row.id, row.storeId.id)}
                              onClick={() => {
                                setOpenPopUp(true);
                                setAddOnsId(row.id);
                                setStoreId(row.storeId.id);
                              }}
                              sx={{
                                mx: 1,
                                // width: '35px',
                                // height: '35px',
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
                            <StyledActionsBox
                              sx={{
                                backgroundColor: '#23C6C8',
                              }}
                              onClick={() => {
                                setAddOnModalOpen(true);
                                setAddOnsModalDetails(row);
                              }}
                            >
                              <SvgColor
                                src="/assets/icons/Order/Eye3.svg"
                                alt=""
                                sx={{ color: 'white', width: '16px', height: '16px' }}
                              />
                            </StyledActionsBox>
                          </Box>
                        </TableCell>
                      </>
                      {/* ))} */}
                    </StyledTableRow>
                  ))}

                  {/* </TableRow> */}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        )}
        {!isAddonsLoading && AddOnFiltered?.length === 0 && (
          <TableContainer>
            <Table
              size="small"
              sx={{
                borderRadius: '8px',
                minWidth: 800,
                borderLeft: '2px solid #BB3138',
                borderRight: '2px solid #BB3138',
                borderBottom: '2px solid #BB3138',
              }}
            >
              <TableHeadCustom
                headLabel={tableLabels}
                // onSort={onSort}
              />
              {/* <TableBody sx={{ display: 'flex', justifyContent: 'center' }}> */}
              {/* <StyledTableRow sx={{ display: 'flex', justifyContent: 'center' }}> */}
              <TableNoData
                isNotFound={isNotFound}
                text="No Addons Added"
                description="You haven't added any Addons in your store yet"
              />
              {/* </StyledTableRow> */}
              {/* </TableBody> */}
            </Table>
          </TableContainer>
        )}

        {/* </CustomizedTables> */}
        {addOns?.results?.length !== 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', mt: 3 }}>
            <BasicPagination
              count={addOns.totalPages}
              page={page}
              fun={setPage}
              setLimit={setLimit}
              totalResults={addOns.totalResults}
            />
          </Box>
        )}
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isDesktop ? '661px' : 300,
            // height: isDesktop ? 150 : 200,
            bgcolor: 'background.paper',
            overflow: 'hidden',
            boxShadow: 24,
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#BB3138',
              padding: '10px',
              width: '100%',
            }}
          >
            <Typography sx={{ color: 'white' }} id="modal-modal-title" variant="h6" component="h2">
              Add AddOns
            </Typography>
            <Box
              sx={{
                width: '26px',
                height: '26px',
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px',
              }}
            >
              <IconButton sx={{ color: 'red' }} onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Box>
          </Box>

          <MenuAddOnForm
            edit={edit}
            editAddonValue={editAddonValue}
            setOpen={setOpen}
            open={open}
            handleClose={handleClose}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
          />
        </Box>
      </Modal>
      <AddOnsModal
        addOnModalOpen={addOnModalOpen}
        setAddOnModalOpen={setAddOnModalOpen}
        addOnsModalDetails={addOnsModalDetails}
      />

      <DeletePopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        setConfirmDelete={handleDelete}
        itemId={addOnsId}
        storeId={storeId}
        content="Are you sure you want to delete? You can't undo this action."
      />
    </>
  );
}

function applyFilter({ inputData, addOnName }) {
  if (addOnName) {
    inputData = inputData.filter(
      (addOn) => addOn.name.toLowerCase().indexOf(addOnName.toLowerCase()) !== -1
    );
  }
  return inputData;
}
