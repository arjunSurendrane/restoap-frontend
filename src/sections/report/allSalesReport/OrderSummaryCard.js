import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

OrderSummaryCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.number,
  total: PropTypes.number,
  subtitleValue: PropTypes.string,
  percent: PropTypes.number,
  border: PropTypes.bool,
};

export default function OrderSummaryCard({
  title = 'hello',
  total = '45454',
  icon = 'eva:checkmark-circle-2-fill',
  color = 'red',
  subtitle,
  subtitleValue,
  percent = '100',
  price = '334',
  border = true,
}) {
  const style = {
    width: 1,
    minWidth: 200,
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={border ? { ...style, borderRight: '1px solid #BB3138' } : style}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        {/* <Iconify icon={icon} width={24} sx={{ color, position: 'absolute' }} /> */}
        <SvgColor
          sx={{ color, position: 'absolute' }}
          alt="iconName"
          // src='/assets/icons/navbar/Dash_Vec.svg'
          src={icon}
        />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={4}
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        <Typography fontSize={15} fontWeight={700}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="subtitle2">
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
              {`${subtitle}: ₹${subtitleValue}`}
            </Box>
          </Typography>
        ) : (
          ''
        )}

        <Typography variant="subtitle2" sx={{ color: 'black' }}>
          ₹{total.toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
  );
}
