import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
MyProfileAbout.propTypes = {
  user: PropTypes.object,
};
function MyProfileAbout({ user }) {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{user.email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">{user.roles[0].name}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ion:call" />

          <Typography variant="body2">
            <span color="text.primary">{user.phone}</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default MyProfileAbout;
