import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { sentenceCase } from 'change-case';
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
  IconButton,
  TableContainer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import FormProvider, { RHFTextField, RHFAutocomplete } from '../../../components/hook-form';
// utils
// import { fCurrency } from '../../../../utils/formatNumber';
import { useDispatch, useSelector } from '../../../redux/store';
import { getBranches } from '../../../redux/slices/branch';
import { getRoles, deleteRole } from '../../../redux/slices/role';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { TableHeadCustom } from '../../../components/table';

// ----------------------------------------------------------------------

MenuCategoryList.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function MenuCategoryList({ title, subheader, tableData, tableLabels, ...other }) {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { roles } = useSelector((state) => state.role);
  const [dropdownValue, setDropdownValue] = useState('');

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const computedValue = useMemo(
    () =>
      // Expensive computation based on value1 and value2
      dispatch(getRoles(dropdownValue)),
    [dispatch, dropdownValue]
  );

  console.log('dropdownValue', dropdownValue);
  console.log('roles', roles);
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ mb: 3 }}
        action={
          <Select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {branches.results.map((data) => (
              <MenuItem value={data.id}>{data.address}</MenuItem>
            ))}
          </Select>
        }
      />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720, backgroundColor: 'red' }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody sx={{ backgroundColor: 'AppWorkspace' }}>
              {roles?.map((data) => (
                <MenuCategoryListRow key={data.id} data={data} storeId={dropdownValue} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

MenuCategoryListRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.number,
    store: PropTypes.string,
    category: PropTypes.string,
  }),
  storeId: PropTypes.string,
};

function MenuCategoryListRow({ data, storeId }) {
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);

  // const handleOpenPopover = (event) => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(null);
  // };

  // const handleDownload = () => {
  //   handleClosePopover();
  //   console.log('DOWNLOAD', data.id);
  // };

  // const handlePrint = () => {
  //   handleClosePopover();
  //   console.log('PRINT', data.id);
  // };

  // const handleShare = () => {
  //   handleClosePopover();
  //   console.log('SHARE', data.id);
  // };

  const handleDelete = () => {
    // handleClosePopover();
    dispatch(deleteRole(data.id, storeId));
    console.log('DELETE', data.id);
  };
  const handleEdit = () => {
    // handleClosePopover();
    console.log('Edit', data.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>{data.name}</TableCell>

        <TableCell>
          <IconButton sx={{ color: 'green' }} onClick={handleEdit}>
            <Iconify icon="bxs:edit" />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton sx={{ color: 'red' }} onClick={handleDelete}>
            <Iconify icon="material-symbols:delete-outline" />
          </IconButton>
        </TableCell>

        <TableCell align="left">
          <LoadingButton
            type="submit"
            variant="contained"
            size="small"
            // loading={isSubmitting}
          >
            Assign Permission
          </LoadingButton>
        </TableCell>
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover> */}
    </>
  );
}
