import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react'
import { Button, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

KitchenAddonsTable.propTypes = {
    data:PropTypes.object,
      
    };

function KitchenAddonsTable({data}) {
    // console.log({addOns})
const item =[
    {
        name:'Mayonnaise',
        qty:"02 Dips",
        size:'Small',
        price:'50.00'

    },
    {
        name:'Coca Cola',
        qty:"01",
        size:'650 Ml',
        price:'45.000'

    }
]
const [isAccepted, setIsAccepted] = useState(true);

  return (

    <Table sx={{ minWidth: 350 }} aria-label="simple table">
      <TableHead  sx={{width:'50px'}}>
        <TableRow>
          <TableCell>ITEM NAME</TableCell>
          <TableCell>QTY</TableCell>
          <TableCell>SIZE</TableCell>
          <TableCell>Action</TableCell>
         
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row)=>(
            <TableRow 
            key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,borderBottom:'0.5px solid black'}}
             >
                  <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.qty}</TableCell>
              <TableCell >{row.size}</TableCell>
              {isAccepted ? (
                <TableCell>
                  <Button sx={{ backgroundColor: '#BB3138', color: 'white' }}>
                  Ready To Serve
                  </Button>
                </TableCell>
              ) : (
                '')}
                </TableRow>
        ))}
      </TableBody>
      </Table>
   
  )
}

export default KitchenAddonsTable