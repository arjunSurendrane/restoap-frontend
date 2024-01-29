import { alpha } from '@mui/material/styles';
import { styled, Button, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
const StyledBreadCrumbsButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  border: '2px solid #FFF',
  background: theme.palette.primary.light,
  color: '#980403',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Public Sans',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
}));

const StyledAddButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '8px',
  border: '2px solid #FFF',
  background: theme.palette.primary.main,
  color: '#FFF',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Public Sans',
  fontSize: '14px',
  fontStyle: 'normal',
  paddingInline: '20px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
  },
}));

const StyledEditButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '8px',
  border: '2px solid #FFF',
  background: '#FFD578',
  color: '#212B36',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Public Sans',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#FFD578',
    color: '#212B36',
  },
}));

const StyledCancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#212B36',
  color: 'white',
  borderRadius: '8px',
  border: '2px solid white',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  fontFamily: 'Public Sans',
  fontSize: '14px',
  fontStyle: 'normal',
  paddingInline: '20px',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#212B36',
    color: '#fff',
  },
}));

const StyledActionsBox = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: 'white',
  borderRadius: '8px',
  border: '2px solid white',
  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export {
  StyledBreadCrumbsButton,
  StyledAddButton,
  StyledEditButton,
  StyledCancelButton,
  StyledActionsBox,
};

// const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

// export default function Button(theme) {
//   const isLight = theme.palette.mode === 'light';

//   const rootStyle = (ownerState) => {
//     const inheritColor = ownerState.color === 'inherit';

//     const containedVariant = ownerState.variant === 'contained';

//     const outlinedVariant = ownerState.variant === 'outlined';

//     const textVariant = ownerState.variant === 'text';

//     const softVariant = ownerState.variant === 'soft';

//     const smallSize = ownerState.size === 'small';

//     const largeSize = ownerState.size === 'large';

//     const defaultStyle = {
//       ...(inheritColor && {
//         // CONTAINED
//         ...(containedVariant && {
//           color: theme.palette.grey[800],
//           '&:hover': {
//             boxShadow: theme.customShadows.z8,
//             backgroundColor: theme.palette.grey[400],
//           },
//         }),
//         // OUTLINED
//         ...(outlinedVariant && {
//           borderColor: alpha(theme.palette.grey[500], 0.32),
//           '&:hover': {
//             borderColor: theme.palette.text.primary,
//             backgroundColor: theme.palette.action.hover,
//           },
//         }),
//         // TEXT
//         ...(textVariant && {
//           '&:hover': {
//             backgroundColor: theme.palette.action.hover,
//           },
//         }),
//         // SOFT
//         ...(softVariant && {
//           color: theme.palette.text.primary,
//           backgroundColor: alpha(theme.palette.grey[500], 0.08),
//           '&:hover': {
//             backgroundColor: alpha(theme.palette.grey[500], 0.24),
//           },
//         }),
//       }),
//     };

//     const colorStyle = COLORS.map((color) => ({
//       ...(ownerState.color === color && {
//         // CONTAINED
//         ...(containedVariant && {
//           '&:hover': {
//             boxShadow: theme.customShadows[color],
//           },
//         }),
//         // SOFT
//         ...(softVariant && {
//           color: theme.palette[color][isLight ? 'dark' : 'light'],
//           backgroundColor: alpha(theme.palette[color].main, 0.16),
//           '&:hover': {
//             backgroundColor: alpha(theme.palette[color].main, 0.32),
//           },
//         }),
//       }),
//     }));

//     const disabledState = {
//       '&.Mui-disabled': {
//         // SOFT
//         ...(softVariant && {
//           backgroundColor: theme.palette.action.disabledBackground,
//         }),
//       },
//     };

//     const size = {
//       ...(smallSize && {
//         height: 30,
//         fontSize: 13,
//         ...(softVariant && {
//           padding: '4px 10px',
//         }),
//       }),
//       ...(largeSize && {
//         height: 48,
//         fontSize: 15,
//         ...(softVariant && {
//           padding: '8px 22px',
//         }),
//       }),
//     };

//     return [...colorStyle, defaultStyle, disabledState, size];
//   };

//   return {
//     MuiButton: {
//       defaultProps: {
//         disableElevation: true,
//       },

//       styleOverrides: {
//         root: ({ ownerState }) => rootStyle(ownerState),
//       },
//     },
//   };
// }
