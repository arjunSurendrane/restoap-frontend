import { Box, Card, Typography, styled } from '@mui/material';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import SvgColor from '../../../../components/svg-color';

const CustomCard = styled(Box)({
  width: '158px',
  height: '69px',
  borderRadius: '8px',
  border: '2px dashed #fff',
  backgroundColor: '#E6E6E6',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const IconCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  width: '50px',
  borderRadius: '69px',
  backgroundColor: '#ecf0f4',
  border: '2px solid #fff',
  boxShadow: ' 0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
});

function RunningOrderCardMobile({ orderDetailDrawerOpen, order }) {
  const timeAgo = moment(order?.createdAt).fromNow();
  return (
    <CustomCard onClick={() => orderDetailDrawerOpen(order)}>
      <IconCard>
        <SvgColor
          sx={{ height: '25px', width: '34px', color: '#BB3138' }}
          src="/assets/icons/branch/DiningTable.svg"
        />
      </IconCard>
      <Box display="flex" flexDirection="column" justifyContent="space-between" p="10px">
        <Typography fontWeight="600" fontSize="16px">{order?.orderNumber}</Typography>
        <Typography fontSize="13px">({timeAgo})</Typography>
      </Box>
    </CustomCard>
  );
}

RunningOrderCardMobile.propTypes = {
  orderDetailDrawerOpen: PropTypes.func,
  order: PropTypes.object,
};
export default RunningOrderCardMobile;
