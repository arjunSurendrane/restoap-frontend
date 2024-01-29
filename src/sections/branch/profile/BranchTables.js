/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  //   Tab,
  Box,
  Card,
  Table,
  Tooltip,
  Skeleton,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../../auth/useAuthContext';

// @mui

// routes
import SvgColor from '../../../components/svg-color/SvgColor';
import BasicPagination from '../../../components/pagination/pagination';
import CustomButton from '../../../components/button/CustomButton';
import { PATH_DASHBOARD } from '../../../routes/paths';

import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
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

// sections
import { TableToolbar, TableRows } from '../../list';
import { DiningCategory } from '../diningCategory';
import { AddTableModal } from '../table';
import { useDispatch, useSelector } from '../../../redux/store';
import { getDiningCategories } from '../../../redux/slices/diningCategory';
import { getTables } from '../../../redux/slices/table';
import DeletePopUp from '../../../components/PopUp/DeletePopUp';
import HasPermission from '../../../auth/RightGuard';
import { StyledAddButton } from '../../../theme/overrides/Button';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tablename', label: 'Table Number', align: 'left' },
  { id: 'diningtype', label: 'Dining Category', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'left' },
];

// ----------------------------------------------------------------------

export default function TableListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split('/');
  const storeId = user.storeId ? user.storeId : pathArray[pathArray.length - 1];
  // console.log('store Idsdsd', storeId);

  // const [tableData, setTableData] = useState(_userList);
  const categoriesOption = [];
  const [tableData, setTableData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterDiningCategory, setFilterDiningCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [openPopover, setOpenPopover] = useState(true);
  const [pages, setpages] = useState(1);
  const SkeltonCount = ['1', '2', '3', '4', '5'];
  let count = 0;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  useEffect(() => {
    dispatch(getDiningCategories(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    if (page > 0) {
      if (dataInPage.length === 0) {
        setPage(page - 1);
      }
    }
    dispatch(getTables(storeId));
  }, [dispatch, storeId]);

  const { diningCategories } = useSelector((state) => state.diningCategory);
  categoriesOption.push('All');
  diningCategories?.map((data) => categoriesOption.push(data.name));
  console.log('DINING CATEGORIES FROM ALL TABLE', diningCategories);
  const { tables, isLoading } = useSelector((state) => state.table);
  console.log('TABLE LIST', tables.totalResults);
  useEffect(() => {
    if (tables?.results) {
      setTableData(tables?.results);
    }
  }, [tableData, tables]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  console.log('filtered data', dataFiltered);
  console.log('table data', tableData);
  let dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  if (dataInPage.length === 0 && page > 1) {
    console.log('enter in table');
    dataInPage = dataFiltered.slice(page - 1 * rowsPerPage, page - 1 * rowsPerPage + rowsPerPage);
    count += 1;
  }
  const denseHeight = 52;
  console.log('table data', dataInPage);
  const isFiltered = filterName !== '' || filterRole !== 'All';
  const isNotFound = !dataFiltered.length;
  console.log('IS NOT FOUND', isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterRole('All');
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleFilterDiningCategory = (event) => {
    setFilterDiningCategory(event.target.value);
  };

  console.log('dataFiltered', dataFiltered);

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);

    setSelected([]);
    setTableData(deleteRow);
    if (page > 0) {
      if (dataInPage.length === 0) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
    console.log('EDIT CLICK FROM BRANCH TABLES', id);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('All');
    setFilterStatus('');
  };
  const isMobileScreen = useMediaQuery('(max-width:475px)');

  const [open, setOpen] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenTableModal = () => {
    setOpenTableModal(true);
  };

  const handleCloseTableModal = () => {
    setOpenTableModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notifyError = (message) => {
    console.log('jhgfdsdfghjk');
    toast.error(message);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Table List </title>
      </Helmet>
      <HasPermission permissionKey="DINING_READ" show403>
        <Box
          sx={{ flexDirection: !isMobileScreen ? 'row' : 'column' }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4">Tables</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              pb: 2,
              // m: 1,
              gap: 1,
              bgcolor: '#F3F3F4',
              borderRadius: 1,
            }}
          >
            <HasPermission permissionKey="DINING_CREATE">
              <StyledAddButton onClick={handleOpenTableModal}>Add Table</StyledAddButton>
            </HasPermission>
            <HasPermission permissionKey="DINING_CREATE">
              <StyledAddButton onClick={handleOpen}>Add Dining Category</StyledAddButton>
            </HasPermission>
          </Box>
        </Box>

        <Card sx={{ borderRadius: '10px', marginTop: '10px' }}>
          <Divider sx={{ marginBottom: '20px' }} />

          <TableToolbar
            sx={{ backgroundColor: 'white' }}
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={categoriesOption}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer
            sx={{
              position: 'relative',
              overflow: 'unset',
              backgroundColor: 'white',
              padding: '20px',
            }}
          >
            <TableSelectedAction
              dense={dense}
              numSelected={selected?.length}
              rowCount={tableData?.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,

                  tableData?.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <HasPermission permissionKey="STORE_DELETE">
                    <Box
                      onClick={handleOpenConfirm}
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
                </Tooltip>
              }
            />

            <Card sx={{ borderRadius: '8px', border: '3px solid #BB3138' }}>
              <Scrollbar>
                <Table
                  size={dense ? 'small' : 'medium'}
                  // sx={{ borderRadius:'8px',minWidth: 800,borderLeft:'2px solid #BB3138',borderRight:'2px solid #BB3138',borderBottom:'2px solid #BB3138' }}
                >
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length}
                    numSelected={selected?.length}
                    // onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,

                        tableData?.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row) => (
                        <>
                          {console.log('ROW', row)}

                          <TableRows
                            key={row.id}
                            row={row}
                            diningCategories={diningCategories}
                            selected={selected.includes(row?.id)}
                            onSelectRow={() => onSelectRow(row?.id)}
                            onDeleteRow={() => handleDeleteRow(row?.id)}
                            onEditRow={() => handleEditRow(row?.name)}
                            storeId={storeId}
                            notifyError={notifyError}
                          />
                        </>
                      ))}

                    {dataFiltered.length === 0 && (
                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                      />
                    )}
                    {isLoading && dataFiltered.length === 0 && (
                      <>
                        {SkeltonCount.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                              <Skeleton animation="wave" />
                            </TableCell>
                            {/* <TableCell>
                            <Skeleton animation="wave" />
                          </TableCell> */}
                          </TableRow>
                        ))}
                      </>
                    )}
                    {!isLoading && dataFiltered.length === 0 && (
                      <TableNoData
                        isNotFound={isNotFound}
                        text="No Tables Added"
                        description="You haven't added any tables in your store yet"
                      />
                    )}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
          </TableContainer>

          {tables?.results?.length > 0 && (
            <TablePaginationCustom
              count={dataFiltered?.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              dense={dense}
              onChangeDense={onChangeDense}
            />
          )}
        </Card>

        <DiningCategory
          open={open}
          onClose={handleClose}
          diningCategories={diningCategories}
          notifyError={notifyError}
          // setOpenPopUp={setOpenPopUp}
          // setCategoryId={setCategoryId}
        />

        <AddTableModal
          open={openTableModal}
          onClose={handleCloseTableModal}
          diningCategories={diningCategories}
          onFilterDiningCategory={handleFilterDiningCategory}
          storeId={storeId}
        />
      </HasPermission>
      {/* </Container> */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  // const stabilizedThis = inputData?.map((el, index) => [el, index]);

  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);

  //   if (order !== 0) return order;

  //   return a[1] - b[1];
  // });

  // inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (tableName) => tableName.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== '') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'All') {
    inputData = inputData.filter((table) => table.dineCategory.name === filterRole);
  }

  return inputData;
}
