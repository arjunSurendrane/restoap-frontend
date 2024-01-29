import { Box, Badge, TextField, useMediaQuery, Grid } from '@mui/material'
import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { orderFilter } from './constant'
import { useAuthContext } from '../../../auth/useAuthContext'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'open',
    'verified',
    'accepted',
    'completed',
];

const OrderListFiltersAndLegends = ({ handleFilterdOrders, handleSearchOrder }) => {
    const { user } = useAuthContext();
    const { roles } = user;
    const role = roles[0]?.name;
    const [personName, setPersonName] = useState([]);
    const isDesktop = useMediaQuery('(min-width:769px)');


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        const status = typeof value === 'string' ? value.split(',') : value;
        // eslint-disable-next-line no-unused-expressions
        handleFilterdOrders(status)
    };


    const handleSearch = (value) => {
        console.log({ value })
        handleSearchOrder(value)
    }
    return (
        <Grid container spacing={0.5} sx={{ marginBottom: 2 }}>
            <Grid item sx={12} md={12} lg={4} container>
                <Grid item xs={3} md={3} lg={6}>
                    <FormControl sx={{ m: 1, minWidth: '90%', maxWidth: '90%' }} size='small'>
                        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Status" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={9} md={9} lg={6} sx={{ my: 1, width: '100%' }}>
                    <TextField fullWidth label="Search order id" id="fullWidth" size='small' onChange={(e) => handleSearch(e.target.value)} />
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={8}>
                <Box sx={{
                    py: 2, display: 'flex', justifyContent: 'space-between', overflow: 'scroll',

                    '& .MuiBox-root::-webkit-scrollbar': {

                        display: 'none',

                    },
                }} >
                    {orderFilter.map((data, index) => {
                        if (data.badge) {
                            if (role === data.role) return (<Box sx={{ borderRadius: 1, display: 'flex', mx: 1 }}><Badge badgeContent={1} color='success'>
                                <Box sx={{ width: '1.25rem', height: '1.25rem', backgroundColor: data.color, borderRadius: 0.5, border: '1', borderColor: 'white' }} />
                            </Badge> <Box sx={{ mx: 1, fontSize: 10 }}>{data.name}</Box>
                            </Box>)
                            return null
                        }
                        return (
                            <Box sx={{ borderRadius: 1, display: 'flex', mx: 1, }}>
                                <Box sx={{ width: '1.25rem', height: '1.25rem', backgroundColor: data.color, borderRadius: 0.5, border: '1', borderColor: 'white' }} />
                                <Box sx={{ mx: 1, fontSize: 10 }}>{data.name}</Box>
                            </Box>
                        )
                    })}

                </Box>
            </Grid>




        </Grid>


    )
}

OrderListFiltersAndLegends.propTypes = {
    handleFilterdOrders: PropTypes.func.isRequired,
    handleSearchOrder: PropTypes.func.isRequired,
};

export default OrderListFiltersAndLegends
