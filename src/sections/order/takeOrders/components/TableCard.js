import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import SvgColor from '../../../../components/svg-color/SvgColor';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
      backgroundImage: 'https://cdn1.iconfinder.com/data/icons/ui-navigation-1/152/switch-512.png',
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
// @mui

const CustomCard = styled(Card)(({ col }) => ({
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '15px',
  paddingBottom: '15px',
  width: '117px',
  height: '113px',
  border: '2px solid white',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
  backgroundColor: col,
  cursor:"pointer",
  // backgroundColor: 'green',
}));

const IconCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65px',
  width: '55px',
  borderRadius: '69px',
  backgroundColor: '#F5F5F5',
  border: '2px solid white',
  boxShadow: ' 0px 0px 2px 0px rgba(0, 0, 0, 0.25);',
});

TableCard.propTypes = {
  tableData: PropTypes.object,
  onClick: PropTypes.func,
  activeOrders: PropTypes.array,
  handleClick: PropTypes.func,
  handleSelectedTable: PropTypes.func,
};

function TableCard({ tableData, onClick, activeOrders, handleClick, handleSelectedTable }) {
  const navigate = useNavigate();
  const isActiveOrder = activeOrders.length > 0;
 
  const handleSetSelectedOrderAndTable = (order, table) => {
    handleClick(order);
    handleSelectedTable(table);
  };

  // const handleClick = () => {
  //   // onClick(navigate(`/dashboard/order/take-order/menu?table=${data.id}`));
  // };
  return (
    <CustomCard
      onClick={() => handleSetSelectedOrderAndTable(activeOrders, tableData)}
      col={isActiveOrder ? '#71C488' : '#E6E6E6'}
    >
      <IconCard>
        <SvgColor
          sx={{ height: '25px', width: '34px', color: '#BB3138' }}
          src="/assets/icons/branch/DiningTable.svg"
        />
      </IconCard>
      <Typography
        sx={{
          textOverflow: 'ellipsis',
          textTransform:'capitalize',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '80px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '500',
          marginTop: '7px',
          color: isActiveOrder ? 'white' : 'black',
        }}
      >
        {tableData.name}
      </Typography>

      <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
        {/* ( Items {data.items.length} ) */}
      </Typography>
    </CustomCard>

    // {/* <Stack direction="row" spacing={1} alignItems="center">
    // {/* <Typography>Off</Typography> */}
    // <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
    // {/* <Typography>On</Typography> */}
    // </Stack> */}
  );
}

export default TableCard;
