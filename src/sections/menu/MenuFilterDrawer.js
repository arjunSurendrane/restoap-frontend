/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';

// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Radio,
  Stack,
  Input,
  Badge,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
  Menu,
  InputLabel,
  FormControl,
} from '@mui/material';
// config
import { NAV } from '../../config-global';
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { getCategories } from '../../redux/slices/category';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import {
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSlider,
} from '../../components/hook-form';
import HasPermission from '../../auth/RightGuard';
import { useAuthContext } from '../../auth/useAuthContext';
import MenuPopover from '../../components/menu-popover/MenuPopover';
import { StyledCancelButton } from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

MenuFilterDrawer.propTypes = {
  setBranch: PropTypes.func,
  setCategory: PropTypes.func,
  onClose: PropTypes.func,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func,
  setPage: PropTypes.func,
};

export default function MenuFilterDrawer({
  onClose,
  isDefault,
  onResetFilter,
  setBranch,
  setCategory,
  setPage,
}) {
  const { control } = useFormContext();
  const { user } = useAuthContext();

  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { categories } = useSelector((state) => state.category);
  const [branchName, setBranchName] = useState(user.storeId ? user.storeId : '');
  const [categoryName, setCategoryName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const filterBranchesOptions = [];
  const categoryOptions = [];
  setBranch(branchName);
  setCategory(categoryName);
  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 100;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  branches?.results?.forEach((data) => {
    if (data.isActive) {
      filterBranchesOptions.push({ id: data.id, store: data.location });
    }
  });

  categories?.results?.map((category) =>
    categoryOptions.push({ id: category.id, name: category.name })
  );

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      setCategoryName('');
      if (branchName) {
        await dispatch(getCategories(branchName));
      }
    };
    fetchData();
  }, [dispatch, branchName]);

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'end' }}>
      <Box
        sx={{
          backgroundColor: '#bb3138',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          width: '46px',
          height: '40px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        disableRipple
        onClick={handleMenu}
      >
        <Iconify icon="ic:round-filter-list" style={{ height: '35px', width: '35px' }} />
      </Box>
      <Menu
        sx={{ padding: '10px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 4.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,

              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Grid container spacing={2} sx={{ padding: '20px', width: '300px' }}>
          <HasPermission permissionKey="GRANT_PERMISSION">
            <Grid item xs={12} md={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Stores</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="branches"
                  value={branchName}
                  label="Stores"
                >
                  {filterBranchesOptions?.map((store) => (
                    <MenuItem
                      onClick={() => {
                        setBranchName(store.id);
                        setPage(1);
                      }}
                      value={store.id}
                    >
                      {store.store}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </HasPermission>

          <Grid item xs={12} md={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Category"
                value={categoryName}
                label="Category"
              >
                {categoryOptions.map((category) => (
                  <MenuItem
                    onClick={() => {
                      setCategoryName(category.id);
                      setPage(1);
                    }}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <StyledCancelButton
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={() => {
                onResetFilter();
                setBranchName('');
                setCategoryName('');
                handleClose();
              }}
            >
              Clear
            </StyledCancelButton>
          </Grid>
        </Grid>
      </Menu>
    </Grid>
  );
}

// ----------------------------------------------------------------------
