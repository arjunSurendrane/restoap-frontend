import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import KOTPrint from './KOTPrint';

const ButtonStyle = {
  backgroundColor: '#BB3138',
  borderRadius: '5px',
  color: '#White',
  fontSize: '14px !important',
  fontWeight: 500,
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
};

KitchenTypeItemList.propTypes = {
  order: PropTypes.object,
  kitchenName: PropTypes.string,
  orderNumber: PropTypes.string,
};

function KitchenTypeItemList({ order, kitchenName, orderNumber }) {
  const [cartItems, setCartItems] = useState(order?.kitchenGroupedItems[kitchenName]);
  console.log({ kitchenName });
  const printKot = useReactToPrint({
    content: () => kotPrintRef.current,
  });

  const kotPrintRef = useRef();

  const KotComponent = (
    <KOTPrint
      newOrder={order}
      cartItems={cartItems}
      printKot={printKot}
      orderNumber={orderNumber}
    />
  );

  const handlePrintKot = () => {
    printKot();
  };

  return (
    <Box sx={{ mb: 5, mt: 1 }}>
      <Box sx={{ display: 'none' }}>
        <div ref={kotPrintRef}>{KotComponent}</div>
      </Box>
      {/* heading swithes */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: 2 }}>
        <Box>
          <Typography variant="subtitle2">{kitchenName}</Typography>
        </Box>
        <Box>
          <Button sx={ButtonStyle} variant="contained" size="small" onClick={handlePrintKot}>
            Print KOT
          </Button>
        </Box>
      </Box>
      {/* Item table */}
      <Box sx={{ mt: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F5F5F5' }}>
            <TableRow>
              <TableCell>ITEM NAME</TableCell>
              <TableCell>QTY</TableCell>
              <TableCell>SIZE</TableCell>
              <TableCell>PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems?.map((item, index) => (
              <TableRow
                key={item.itemId + index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: '0.5px solid black',
                }}
              >
                <TableCell component="th" scope="row">
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item?.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{ cursor: 'pointer', fontSize: '12px', fontWeight: '400' }}
                      style={{ color: 'red' }}
                    >
                      <u>{item?.note ? item.note.slice(0, 15) : ''}</u>
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" width="30px">
                      <Typography mr="10px" ml="10px">
                        {item?.quantity}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                >
                  {item?.variant?.name || 'Nil'}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                    {item.finalPrice.toFixed(2)}
                    <br />
                    <span style={{ fontSize: '12px', fontWeight: '400' }}>
                      {item?.basePrice.toFixed(2)}
                    </span>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default KitchenTypeItemList;
