import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

// ProfileAbout.propTypes = {
//   company: PropTypes.string,
//   country: PropTypes.string,
//   email: PropTypes.string,
//   quote: PropTypes.string,
//   role: PropTypes.string,
//   school: PropTypes.string,
// };

export default function ProfileAbout() {
  const { user } = useSelector((state) => state.user);
  const { email, phone, storeId, roles } = user;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {storeId?.address}
            </Link>
          </Typography>
        </Stack> */}

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />
          {roles?.map((role) => (
            <Typography variant="body2">
              {role?.name} at &nbsp;
              <span color="text.primary">
                {storeId.name} , {storeId?.location}
              </span>
            </Typography>
          ))}
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ion:call" />

          <Typography variant="body2">
            <span color="text.primary">{phone}</span>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
