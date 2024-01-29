import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Divider } from '@mui/material';
//
import Image from '../image';

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  text: PropTypes.string,
};

export default function EmptyContent({ title, description, text, img, sx, ...other }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
      }}
      {...other}
    >
      <Image
        // disabledEffect
        alt="empty content"
        src={img || '/assets/images/home/no-result.svg'}
        // sx={{ height: 340 }}
      />
      {/* <Divider sx={{ backgroundColor: '#BB3138', width: '100%', marginTop: '-25px' }}> </Divider> */}

      <Typography variant="h4" gutterBottom sx={{ color: '#BB3138', mt: 2 }}>
        {text}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
