import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Box, Grid, useMediaQuery, Stack } from '@mui/material';
// eslint-disable-next-line import/no-duplicates

import OrderCard from './OrderCard';
import OrderAdminDrawer from './OrderAdminDrawer';
import { orderData } from './orderData';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';

export default function KitchenLiveOrders() {
  const isDesktop = useMediaQuery('(min-width:768px)');
  // eslint-disable-next-line no-sparse-arrays

  const [drawerOrderData, setDrawerOrderDAta] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const { orders, error } = useSelector((state) => state.order);

  const verifiedOrders = orders.map((data) => (data.orderStatus !== 'open' ? data : false));

  console.log({ verifiedOrders });

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (!verifiedOrders.length) return <SkeltonForLiveOrderList />;

  if (error) return <div>Error...</div>;

  if (!verifiedOrders.length) return <div>Empty order</div>;

  const handleOpenDrawer = (data) => {
    setDrawerOrderDAta(data);
    console.log({ data });
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        {drawerOrderData !== {} && (
          <OrderAdminDrawer
            //   isDefault={isDefault}
            dataIndex={drawerOrderData}
            open={openDrawer}
            onOpen={handleOpenDrawer}
            onClose={handleCloseDrawer}
          />
        )}
      </Stack>
      {isDesktop ? (
        <Box
          gap={2}
          alignItems="center"
          display="flex"
          //   backgroundColor="red"
          mx="auto"
          flexWrap="wrap"
          textAlign="center"
        >
          {verifiedOrders.map((data, index) => {
            let isOrderCompleted = true;
            data?.items?.forEach((item) => {
              if (item.status !== 'delivered') isOrderCompleted = false;
            });

            return (
              <>
                {isOrderCompleted ? (
                  ''
                ) : (
                  <OrderCard
                    handleOpen={handleOpenDrawer}
                    data={data}
                    index={index}
                    key={data._id.$oid}
                  />
                )}
              </>
            );
          })}
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: isDesktop ? 'center' : 'center',

            alignItems: 'center',
            // alignContent: 'center',
          }}
        >
          {verifiedOrders.map((data) => (
            <OrderCard
              handleOpen={(itemData) => handleOpenDrawer(itemData)}
              data={data}
              key={data._id.$oid}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
