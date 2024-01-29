import { Card, Typography, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SvgColor from '../../../../components/svg-color/SvgColor';

OrderCard.propTypes = {
  order: PropTypes.object,
  handleSelectSingleOrder: PropTypes.func,
};
const CustomCard = styled(Card)(({ col }) => ({
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '15px',
  paddingBottom: '15px',
  width: '125px',
  height: '166px',
  border: '2px dashed white',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
  backgroundColor: '#E6E6E6',
}));

const IconCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65px',
  width: '65px',
  borderRadius: '69px',
  backgroundColor: '#F5F5F5',
  border: '2px solid white',
  boxShadow: ' 0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
});

function OrderCard({ order, handleSelectSingleOrder }) {
  const { subOrders } = order;
  const flaternArray = subOrders.flat();
  const allOrders = flaternArray.flatMap((item) => item.addons.concat(item.orderItems));
  const timeAgo = moment(order?.createdAt).fromNow(true);

  return (
    <CustomCard onClick={() => handleSelectSingleOrder(order)}>
      <Typography fontWeight="fontWeightRegular" fontSize="14px">{timeAgo}</Typography>
      <IconCard>
        <SvgColor
          sx={{ height: '33px', width: '33px', color: '#BB3138' }}
          src="/assets/icons/branch/DiningTable.svg"
        />
      </IconCard>
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '80px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '500',
          marginTop: '7px',
          color: 'black',
        }}
      >
        {order.orderNumber}
      </Typography>

      <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>( Items {allOrders.length} )</Typography>
    </CustomCard>
  );
}

export default OrderCard;
