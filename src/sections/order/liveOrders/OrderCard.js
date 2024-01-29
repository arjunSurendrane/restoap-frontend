import { Card, Chip, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import SvgColor from 'src/components/svg-color/SvgColor';
import PropTypes from 'prop-types';
import moment from 'moment';
import { orderStatus } from './constant';
import { useAuthContext } from '../../../auth/useAuthContext';
import DineInIcon from '../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../assets/icons/TakeAwayIcon';

OrderCard.propTypes = {
  data: PropTypes.object,
  handleSelectedOrder: PropTypes.func,
};

export default function OrderCard({ data, handleSelectedOrder }) {
  console.log({ data });

  const { subOrders } = data;
  let timeAgo = moment(data?.subOrders?.createdAt).fromNow();

  if (timeAgo === 'a few seconds ago') timeAgo = '0 sec ago';

  // Function to show status
  const handleShowStatus = (status) => {
    let text;
    let icon;

    if (status === 'take_away') {
      text = 'Takeaway';
      icon = <TakeAwayIcon />;
    } else if (status === 'dining') {
      text = 'Dining';
      icon = <DineInIcon />;
    } else {
      text = 'Pre-Order';
      icon = null;
    }

    return { text, icon };
  };

  const status = {
    dining: 'Dining',
    take_away: 'Takeaway',
    preorder: 'Pre-Order',
  };
  // eslint-disable-next-line no-unsafe-optional-chaining
  const getTotal = () => data?.subOrders?.orderItems?.length + data?.subOrders?.addons?.length;

  const getCompletedOrder = () => {
    const orders = data?.subOrders?.orderItems?.filter(
      (item) => item?.itemStatus === 'readytoserve' || item?.itemStatus === 'delivered'
    );
    return orders.length;
  };

  return (
    <Badge
      // eslint-disable-next-line no-nested-ternary
      // badgeContent={isKitchen ? pendingOrders.length : data.completedTasks}
      badgeContent={`${getCompletedOrder()}/${getTotal()}`}
      color="success"
      sx={{
        ' .MuiBadge-badge': {
          right: '50%',
          border: '1px dashed #fff',
          backgroundColor: '#EE0F09',
          width: '50px',
        },
        m: 2,
      }}
    >
      <Card
        sx={{
          backgroundColor: orderStatus[subOrders?.orderStatus],
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '118px',
          height: '135px',
          border: '2px solid white',
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
          marginRight: '10px',
        }}
        onClick={() => handleSelectedOrder(data)}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: '400', marginTop: '3px' }}>
          {timeAgo}
        </Typography>
        
        <Chip
          sx={{
            height: '24px',
            backgroundColor:subOrders?.orderType==='take_away'? '#F57C24':'#05C805',
            fontSize: '10px',
            fontWeight: '500',
            minWidth: '85px',
          }}
          icon={handleShowStatus(subOrders?.orderType)?.icon}
          label={status[subOrders?.orderType]}
        />
        <Typography
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '80px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '600',
            marginTop: '7px',
            textTransform:"capitalize"
          }}
        >
          {data.tableNo}
        </Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
          KOT: {subOrders?.kotNumber}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>( Items {getTotal()} )</Typography>
      </Card>
    </Badge>
  );
}
