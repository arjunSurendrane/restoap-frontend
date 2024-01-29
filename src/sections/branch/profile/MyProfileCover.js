import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// utils
import { bgBlur } from '../../../utils/cssStyles';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import Image from '../../../components/image';
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));
MyProfileCover.propTypes = {
  user: PropTypes.object,
};

function MyProfileCover({ user }) {
  return (
    <>
      <StyledInfo>
        <CustomAvatar
          src={user?.avatarUrl?.name || '/assets/images/Branch/UserImage.svg'}
          // src={user?.avatarUrl[0]?.name || '/assets/images/Branch/UserImage.jpg'}
          alt="UserName"
          // name={user?.displayName}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">
            {user.firstName}
            &nbsp;
            {user.lastName}
          </Typography>

          <Typography sx={{ opacity: 0.72 }}>{user.roles[0].name}</Typography>
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src="/assets/images/Branch/BranchCover.jpg"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      />
    </>
  );
}

export default MyProfileCover;
