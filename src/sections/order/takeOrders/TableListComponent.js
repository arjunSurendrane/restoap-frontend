import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Accordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useState, React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Card, Typography, Button, IconButton, Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useNavigate } from 'react-router';
import SquareIcon from '@mui/icons-material/Square';
// import Typography from '../../../theme/overrides/Typography';
import TableCard from './components/TableCard';
import OrderCard from './components/OrderCard';
import RunningOrderDetails from './components/RunningOrderDetails';
import { clearCartItems, setTableAndOrderId } from '../../../redux/slices/takeOrderCart';
import HasPermission from '../../../auth/RightGuard';
import SkeletonTableLayout from '../../../components/skeleton/SkeletonTableLayout';
import CustomButton from '../../../components/button/CustomButton';

const MainCard = styled(Card)({
  minHeight: '500px',
  width: '100%',
  // width:"610px",
  borderRadius: '8px',
});

const OrderCardContainer = styled(Card)({
  width: '451px',
  height: '500px',
  borderRadius: '8px',
  boxShadow: ' 0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  padding: '15px',
  marginLeft: '20px',
});

export default function TakeOrders() {
  const { diningCategories } = useSelector((state) => state.diningCategory);
  const cartItemTableId = useSelector((state) => state.cart.table);
  const { mainOrders } = useSelector((state) => state.order);
  const { isLoading, tables } = useSelector((state) => state.table);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for open/close right side table orders component
  const [openOrders, setOpenOrders] = useState(false);

  // State for store selected table details
  const [selectedTable, setSelectedTable] = useState({});
  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  // State for filter table by running and empty table
  const [filterText, setFilterText] = useState('');

  // State for storing filtered tables
  const [filteredTables, setFilteredTables] = useState([]);

  // State for storing selected table all order details
  const [selectedTableOrder, setSelectedTableOrder] = useState([]);

  // State to store selected single order
  const [selectedSingleOrder, setSelectedSingleOrder] = useState({});

  // Function to set selected  table order details
  const handleClick = (order) => {
    setSelectedTableOrder(order);
    setOpenOrders(true);
  };

  // Function to set selected table detals to the state
  const handleSelectedTable = (table) => setSelectedTable(table);
  // Function to close drawer
  const handleCloseDrawer = () => setOpenViewDrawer(false);

  // Function to handle add new order for selected table
  const handleAddNewOrder = () => {
    // If params table id is not equel to the redux table id then clear the cart
    if (cartItemTableId && cartItemTableId !== selectedTable?.id) dispatch(clearCartItems());
    dispatch(setTableAndOrderId({ table: selectedTable?.id }));
    navigate(`/dashboard/order/take-order/menu?table=${selectedTable?.id}`);
  };

  // Function to handle add additional order seleted table
  const handleAddAdditionalOrder = (orderId) => {
    // If params table id is not equel to the redux table id then clear the cart
    if (cartItemTableId && cartItemTableId !== selectedTable?.id) dispatch(clearCartItems());
    dispatch(setTableAndOrderId({ table: selectedTable?.id, orderId }));
    navigate(`/dashboard/order/take-order/menu?table=${selectedTable?.id}`);
  };
  // Function to set the selected table all orders
  const handleSelectedOrder = (order) => {
    setSelectedTableOrder(order);
  };

  // Funtion which handle selected running order set to state
  const handleSelectSingleOrder = (order) => {
    setSelectedSingleOrder(order);
    setOpenViewDrawer(true);
  };

  // Function to filter running table and empty table
  // const activeOrders = mainOrders.filter((items) => items.tableNo === table.name);
  const filterTable = (type) => {
    const newTables = tables?.results?.filter((table) => {
      let newData;
      if (type === 'running') {
        newData = mainOrders?.some((item) => item.tableNo === table.name);
      } else {
        newData = !mainOrders?.some((item) => item.tableNo === table.name);
      }
      return newData;
    });
    setFilteredTables(newTables);
  };

  useEffect(() => {
    filterTable(filterText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText]);

  useEffect(() => {
    setFilteredTables(tables?.results);
  }, [tables]);
  
  return (
  
   <HasPermission permissionKey="MANAGE_TAKE_ORDERS" show403>
      <Box display="flex">
        <MainCard>
          <Box height="60px" width="100%" p="15px" display="flex" justifyContent="space-between">
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
              <Typography fontWeight="fontWeightMedium" fontSize="18px">
                Table Layout
              </Typography>
            </Box>
            <Box display="flex" justifyContent="end" gap={2}>
              <Button
                onClick={() => setFilterText('blank')}
                startIcon={
                  <SquareIcon
                    sx={{
                      color: '#E6E6E6',
                      border: filterText === 'blank' ? '2px solid #FFF' : '',
                    }}
                  />
                }
                sx={{
                  color: 'black',
                  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                  border: '1px solid #E6E6E6;',
                  height: '40px',
                  backgroundColor: filterText === 'blank' ? '#E6E6E6' : '',
                }}
              >
                Blank Table
              </Button>
              <Button
                onClick={() => setFilterText('running')}
                startIcon={
                  <SquareIcon
                    sx={{
                      color: '#71C488',
                      border: filterText === 'running' ? '2px solid #FFF' : '',
                    }}
                  />
                }
                variant="outlined"
                sx={{
                  color: 'black',
                  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                  border: '1px solid #71C488',
                  height: '40px',
                  backgroundColor: filterText === 'running' ? '#71C488' : '',
                }}
              >
                Running Table
              </Button>
            </Box>
          </Box>
          {isLoading ? (
            <SkeletonTableLayout />
          ) : (
            <Stack spacing={0.5} mt={1} padding="15px">
              {diningCategories?.map((data, index) => (
                <Accordion
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                    borderTop: '1px solid #8080803d',
                  }}
                  // expanded={expanded.includes(`panel${index}`)}
                  // onChange={handleChange(`panel${index}`)}
                  defaultExpanded
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#BB3138' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}
                    >
                      {data?.name}
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails>
                    <Box
                      gap={2}
                      alignItems="center"
                      display="flex"
                      mx="auto"
                      flexWrap="wrap"
                      textAlign="center"
                    >
                      {filteredTables?.map((table, i) => {
                        const activeOrders = mainOrders.filter(
                          (items) => items.tableNo === table.name
                        );
                        return table?.dineCategory?.name === data?.name ? (
                          <TableCard
                            handleSelectedTable={handleSelectedTable}
                            handleClick={handleClick}
                            tableData={table}
                            activeOrders={activeOrders}
                          />
                        ) : (
                          ''
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </MainCard>
        {openOrders && (
          <Box sx={{ width: '471px', height: '500px', position: 'relative' }}>
            <OrderCardContainer>
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize="18px" fontWeight="fontWeightMedium">
                  {selectedTable?.name}- Running Orders
                </Typography>
                <CustomButton value='Add Order' sx={{fontWeight:'500!important'}} variant="contained" fun={handleAddNewOrder}/>
                
              </Box>

              <Box
                sx={{
                  maxHeight: '420px',
                  overflow: 'scroll',
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'start',
                  justifyContent: 'center',
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                mt={2}
                gap={1}
              >
                {selectedTableOrder.length > 0 ? (
                  selectedTableOrder?.map((item) => (
                    <OrderCard handleSelectSingleOrder={handleSelectSingleOrder} order={item} />
                  ))
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    
                  >
                    <img
                      src="../../assets/illustrations/No result.svg"
                      alt="chefimg"
                      height="300px"
                    />
                    <Typography fontWeight="700" fontSize="20px">
                      No Orders
                    </Typography>

                    <Typography fontWeight="400" fontSize="14px">
                      {' '}
                      {`You haven't added any order to this table.`}
                    </Typography>
                  </Box>
                )}
              </Box>
            </OrderCardContainer>
            <Box
              onClick={() => setOpenOrders(false)}
              sx={{
                backgroundColor: '#BB3138',
                borderRadius: '50px',
                position: 'absolute',
                top: '50%',
                left: 6,
                zIndex: 1,
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowForwardIosRoundedIcon sx={{ color: '#fff' }} />
            </Box>
          </Box>
        )}
      </Box>
      <Drawer
        open={openViewDrawer}
        onClose={handleCloseDrawer}
        anchor="right"
        PaperProps={{
          sx: {
            width: {
              xs: 320,
              sm: 480,
              md: 480,
              lg: 480,
              xl: 480,
            },
          },
        }}
      >
        <RunningOrderDetails
          handleAddAdditionalOrder={handleAddAdditionalOrder}
          handleAddNewOrder={handleAddNewOrder}
          handleCloseDrawer={handleCloseDrawer}
          order={selectedSingleOrder}
        />
      </Drawer>
      </HasPermission>
    
  );
}
