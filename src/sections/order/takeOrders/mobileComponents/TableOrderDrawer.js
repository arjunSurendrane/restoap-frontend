import { Box, Button, Drawer, Typography, styled } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import CustomButton from '../../../../components/button/CustomButton';
import RunningOrderCardMobile from './RunningOrderCardMobile';

const CloseBtn = styled(Button)({
  borderRadius: '6px',
  width: '30px',
  height: '30px',
  backgroundColor: 'white',
  border: 'none',
  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
  fontSize: '14px',
  padding: 0,
});
const DrawerHeader = styled(Box)({
  width: '100%',
  height: '50px',
  backgroundColor: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '6px',
});

function TableOrderDrawer({
  open,
  closeDrawer,
  orderDetailDrawerOpen,
  orders,
  table,
  addNewOrder,
}) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      sx={{
        backgroundColor: 'transparent',
        paddingBottom: '40px',
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <DrawerHeader>
        <CloseBtn onClick={closeDrawer}>
          <ClearIcon sx={{ color: '#BB3138', height: '1.2em' }} />
        </CloseBtn>
      </DrawerHeader>
      <Box width="100%" height="400px" bgcolor="#fff" borderRadius="16px 16px 0px 0px" p={2}>
        <Typography fontSize="16px" fontWeight="600">
          {table?.name} Running Orders
        </Typography>
        <Box width="100%" display="flex" justifyContent="end" mt={1}>
          <CustomButton value="Add Order" fun={addNewOrder} />
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          rowGap={2}
          alignItems="center"
          mt={2}
          maxHeight="280px"
          overflow="scroll"
        >
          {orders?.length === 0 ? (
            <Box
              display="flex"
              height="200"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <img src="../../assets/illustrations/No result.svg" alt="chefimg" height="200" />
              <Typography fontWeight="700" fontSize="20px">
                No Orders
              </Typography>

              <Typography fontWeight="400" fontSize="14px">
               
                {`You haven't added any order to this table.`}
              </Typography>
            </Box>
          ) : (
            orders?.map((order) => (
              <RunningOrderCardMobile
                key={order?.id}
                order={order}
                orderDetailDrawerOpen={orderDetailDrawerOpen}
              />
            ))
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

TableOrderDrawer.propTypes = {
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
  orderDetailDrawerOpen: PropTypes.func,
  orders: PropTypes.array,
  table: PropTypes.string,
  addNewOrder: PropTypes.func,
};
export default TableOrderDrawer;
