import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { MenuItem, InputLabel } from '@mui/material';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuthContext } from '../../../auth/useAuthContext';
import { useDispatch, useSelector } from '../../../redux/store';
import { getBranches } from '../../../redux/slices/branch';

export default function BasicSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [branch, setbranch] = useState('');
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const { branches, isLoading } = useSelector((state) => state.branch);

  console.log('isAuthenticated, isInitialized, user ', isAuthenticated, isInitialized, user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getStores = async () => {
  //   await ;
  // };

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const handleChange = (event) => {
    setbranch(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: '14px', fontWeight: 400 }} id="demo-simple-select-label">
          Switch Store
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={branch}
          size="small"
          minWidth="40px"
          label="Switch Branch"
          onChange={handleChange}
          sx={{ height: '50px' }}
        >
          {branches.results.map((store) => (
            <MenuItem onClick={() => navigate('/login')} value={store.id}>
              {store.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
