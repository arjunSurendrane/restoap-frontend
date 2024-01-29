import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// @mui
import {
  Box,
  Card,
  Button,
  Avatar,
  Typography,
  Stack,
  IconButton,
  MenuItem,
  Grid,
  Drawer,
} from '@mui/material';
// components
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import SuccessPopUp from '../../../components/PopUp/SuccessPopUp';
import SvgColor from '../../../components/svg-color/SvgColor';
import { SkeletonProductItem } from '../../../components/skeleton';
import SkeletonUser from '../../../components/skeleton/SkeletonUser';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover/MenuPopover';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getUserByStore, deleteUserById } from '../../../redux/slices/user';
import { dispatch } from '../../../redux/store';
import DeletePopUp from '../../../components/PopUp/DeletePopUp';
import UserCard from './components/UserCard';
import ConfirmDialog from '../../../components/confirm-dialog/ConfirmDialog';
import { useSnackbar } from '../../../components/snackbar';
import HasPermission from '../../../auth/RightGuard';
import { useAuthContext } from '../../../auth/useAuthContext';
import NoResultFound from '../../../pages/NoResultPage';

BranchUsers.propTypes = {
  storeId: PropTypes.string,
};

export function BranchUsers({ storeId }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { users, isLoading } = useSelector((state) => state.user);

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  console.log('selectedUser', selectedUser);

  const handleOpenDeleteConfirm = (userId) => {
    setOpenDeleteConfirm(true);
    setSelectedUser(userId);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);

    // isEdit(false)
  };

  const handleDeleteUser = (userId) => {
    const res = dispatch(deleteUserById(userId, storeId)).then((response) => {
      if (response.status === 204) {
        enqueueSnackbar('User Deleted Successfully', {
          variant: 'warning',
        });
      } else {
        enqueueSnackbar('User Deleted Failed', {
          variant: 'error',
        });
      }
    });
  };
  useEffect(() => {
    localStorage.setItem('tabValue', 'Users');
  }, []);

  const { user } = useAuthContext();
  const permission = user.roles;

  console.log('authUser', user);
  return (
    <HasPermission permissionKey="USER_READ" show403>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          m: 1,
          gap: 1,
          borderRadius: 1,
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Typography variant="h4">Users</Typography>

        <HasPermission permissionKey="USER_CREATE">
          <Button
            component={RouterLink}
            to={`/dashboard/branches/addUser/${storeId}`}
            sx={{
              height: '40px',
              width: '105px',
              border: '2px solid white',
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: '8px',
            }}
            variant="contained"
            // startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button>
        </HasPermission>
      </Box>
      {!isLoading ? (
        user.roles[0].permissions.includes('USER_READ') && (
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            marginTop="15px"
          >
            {users?.map((item) => (
              <UserCard user={item} handleOpenDeleteConfirm={handleOpenDeleteConfirm} />
            ))}
          </Box>
        )
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <SkeletonUser count={6} />
        </Box>
      )}
      {users.length === 0 && (
        <NoResultFound
          title="No User Added"
          content="You have not added any users in your store yet"
        />
      )}
      <ConfirmDialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        title="Delete"
        content={<>Are you sure want to delete items?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteUser(selectedUser);
              handleCloseDeleteConfirm();
            }}
          >
            Delete
          </Button>
        }
      />

      <Drawer
        open={openDrawer}
        // eslint-disable-next-line no-restricted-globals
        onClose={handleCloseDrawer}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          //   sx: { width: 320 },

          sx: {
            width: {
              xs: 320, // Width for extra small screens and up
              sm: 480, // Width for small screens and up
              md: 480, // Width for medium screens and up
              lg: 480, // Width for large screens and up
              xl: 480, // Width for extra large screens and up
            },
          },
        }}
        // {...other}>
      >
        hai
      </Drawer>
    </HasPermission>
  );
}
