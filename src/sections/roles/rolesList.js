/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { sentenceCase } from 'change-case';
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
} from '@mui/material';

import { styled } from 'styled-components';
import SvgColor from '../../components/svg-color/SvgColor';
import CustomButton from '../../components/button/CustomButton';
import HasPermission from '../../auth/RightGuard';
import { useAuthContext } from '../../auth/useAuthContext';

// utils
// import { fCurrency } from '../../../../utils/formatNumber';
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { getRoles, deleteRole } from '../../redux/slices/role';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { TableHeadCustom } from '../../components/table';
import BasicPagination from '../../components/pagination/pagination';
import { StyledActionsBox } from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

RoleListTable.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
  setEdit: PropTypes.func,
  setEditValues: PropTypes.func,
  setStore: PropTypes.func,
};

export default function RoleListTable({
  title,
  subheader,
  tableData,
  tableLabels,
  setEdit,
  setStore,
  setEditValues,
  ...other
}) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [page, setPage] = useState(1);
  const { branches } = useSelector((state) => state.branch);
  const { roles } = useSelector((state) => state.role);
  const [limit, setLimit] = useState(5);
  const totalPage = Math.ceil(roles.length / limit);
  const [dropdownValue, setDropdownValue] = useState('');
  useEffect(() => {
    setDropdownValue(user.storeId ? user.storeId : branches.results?.[0]?.id);
  }, [branches.results, user.storeId]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  const computedValue = useMemo(
    () =>
      dispatch(getRoles(dropdownValue)),
    [dispatch, dropdownValue]
  );

  return (
    <Card {...other}>
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
              }}
              size="small"
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
                {roles?.slice((page - 1) * limit, page * limit)?.map((data) => (
                  <RoleListTableRow
                    key={data.id}
                    data={data}
                    storeId={dropdownValue}
                    setEdit={setEdit}
                    setEditValues={setEditValues}
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
          totalResults={roles.length}
          limit={limit}
        />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

RoleListTableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.number,
    store: PropTypes.string,
    isSystemRole: PropTypes.bool,
    category: PropTypes.string,
  }),
  storeId: PropTypes.string,
  setEdit: PropTypes.string,
  setEditValues: PropTypes.func,
};

function RoleListTableRow({ data, setEdit, storeId, setEditValues }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);

  const handleDelete = () => {
    dispatch(deleteRole(data.id, storeId));
  };
  const handleEdit = () => {
    setEdit(true);
    setEditValues(data);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F4F4F4;',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#E6E6E6;',
    },
  }));

  return (
    <StyledTableRow>
      <TableCell sx={{ width: '20rem', p: 2 }}>
        {data.name.replace(/\b\w/g, (char) => char.toUpperCase())}
      </TableCell>
      <TableCell
        align="start"
        sx={{
          borderLeft: '2px solid white',
        }}
      >
        <Grid container>
          <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
            {!data.isSystemRole ? (
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
              </Box>
            ) : null}
          </Grid>
          <Grid item sx={9} md={9}>
            <Link to={`/dashboard/permission/${data.id}`}>
              <CustomButton value="Assign Permission" />
            </Link>
          </Grid>
        </Grid>
      </TableCell>
    </StyledTableRow>
  );
}
