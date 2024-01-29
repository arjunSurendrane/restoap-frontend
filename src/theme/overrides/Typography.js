// ----------------------------------------------------------------------
import { alpha } from '@mui/material/styles';
import { styled, Box } from '@mui/material';

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme?.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme?.spacing(1),
        },
      },
    },
  };
}

export const StyledTypography = styled('div')({
  color: '#212B36',
  fontFamily: 'Public Sans',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
});
