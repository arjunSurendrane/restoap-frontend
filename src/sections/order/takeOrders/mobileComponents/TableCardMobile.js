import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const TableCard = styled(Box)(({ col }) => ({
  borderRadius: '8px',
  border: '2px solid #fff',
  backgroundColor: col ? '#71C488' : '#E6E6E6',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
  height: '40px',
  width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
function TableCardMobile({ openOrderDrawer, isRunnigTable, tableData, handleSelectTableOrders }) {
  console.log({ isRunnigTable });
  const handleTableClick = () => {
    handleSelectTableOrders(isRunnigTable, tableData);
    openOrderDrawer(true);
  };
  return (
    <TableCard onClick={handleTableClick} col={isRunnigTable?.length}>
      <Typography fontSize="14px" fontWeight="500" color={isRunnigTable?.length ? '#fff' : 'black'}>
        {tableData?.name}
      </Typography>
    </TableCard>
  );
}

TableCardMobile.propTypes = {
  handleSelectTableOrders: PropTypes.func,
  openOrderDrawer: PropTypes.func,
  isRunnigTable: PropTypes.bool,
  tableData: PropTypes.object,
};

export default TableCardMobile;
