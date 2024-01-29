import React from 'react';
import { Card, Avatar, Box, Typography, Stack, Tooltip, Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';

import SvgColor from '../../../../components/svg-color/SvgColor';
import HasPermission from '../../../../auth/RightGuard';

const UserCard = ({ handleOpenDeleteConfirm, user }) => {
  const { firstName, lastName, avatarUrl, id, roles } = user;

  const navigate = useNavigate();

  const handleEditUser = () => {
    navigate(`/dashboard/branches/editUser/${id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: '8px',
        backgroundColor: '#FFF',
        boxShadow: '0px 4px 4px 2px rgba(0 0 0 0.05)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={firstName}
        src={avatarUrl?.name || '/assets/images/Branch/userp.svg'}
        sx={{ width: 48, height: 48 }}
      />

      <Box
        sx={{
          pl: 2,
          pr: 1,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Link sx={{ color: '#212B36' }}>
          <Typography
            variant="subtitle2"
            sx={{ textDecoration: 'none', color: 'inherit' }}
            component={RouterLink}
            to={`/dashboard/branches/userProfile/${id}`}
            noWrap
          >
            {firstName} {lastName}
          </Typography>
        </Link>

        <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
          <SvgColor
            src="/assets/icons/branch/Avatar3.svg"
            alt=""
            sx={{ height: '15px', width: '14px' }}
          />

          {roles?.map((role) => (
            <Typography variant="body2" component="span" noWrap>
              {role?.name}
            </Typography>
          ))}
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title="Edit">
          <HasPermission permissionKey="USER_UPDATE">
            <Box
              onClick={handleEditUser}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: '#FEB700',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
              }}
            >
              <SvgColor
                sx={{ mx: 1, width: '16px', height: '16px', color: 'white' }}
                src="/assets/icons/branch/edit.svg"
                alt=""
              />
            </Box>
          </HasPermission>
        </Tooltip>

        <Tooltip title="Delete">
          <HasPermission permissionKey="USER_DELETE">
            <Box
              onClick={() => handleOpenDeleteConfirm(id)}
              sx={{
                mx: 1,
                width: '35px',
                height: '35px',
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.24)',
                cursor: 'pointer',
              }}
            >
              <SvgColor
                src="/assets/icons/branch/Delete_Icon.svg"
                alt=""
                sx={{ color: 'white', width: '16px', height: '16px' }}
              />
            </Box>
          </HasPermission>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default UserCard;

UserCard.propTypes = {
  handleOpenDeleteConfirm: PropTypes.func,
  user: PropTypes.object,
};
