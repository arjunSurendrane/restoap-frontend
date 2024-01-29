import PropTypes from 'prop-types';
// @mui
import { Switch, Divider, Typography, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

PaymentSummary.propTypes = {
  sx: PropTypes.object,
  product: PropTypes.object,
  curPlan: PropTypes.object,
};

export default function PaymentSummary({ product, curPlan, sx, ...other }) {
  const { name } = product;
  const { amount, interval } = curPlan;


  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="error">{name}</Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Billed ${interval}ly`}
          </Typography>
        </Stack>

        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Typography variant="h5">Rs.</Typography>

          <Typography variant="h2">{amount / 100}</Typography>

          <Typography component="span" sx={{ mb: 1, alignSelf: 'center', color: 'text.secondary' }}>
            {`/${interval.slice(0, 2)}`}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Total Billed</Typography>

          <Typography variant="h6">{`Rs. ${amount / 100}`}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
        Subscribe My Plan
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
