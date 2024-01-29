import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function DineInIcon({ ...other }) {
 
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="#05C805"
      >
        <path
          d="M9.51798 11.2339L8.81465 10.7673C8.76887 10.7367 8.73137 10.6953 8.70549 10.6468C8.6796 10.5982 8.66615 10.544 8.66632 10.4889V6.33398H7.333V10.4889C7.33301 10.5438 7.31947 10.5978 7.2936 10.6462C7.26772 10.6946 7.23031 10.7358 7.18467 10.7663L6.48134 11.2339C6.4357 11.2644 6.39828 11.3056 6.37241 11.354C6.34653 11.4024 6.333 11.4564 6.33301 11.5113V11.6673C6.33301 11.7557 6.36813 11.8405 6.43064 11.903C6.49315 11.9655 6.57793 12.0006 6.66634 12.0006H9.33298C9.42139 12.0006 9.50617 11.9655 9.56868 11.903C9.63119 11.8405 9.66631 11.7557 9.66631 11.6673V11.5123C9.66648 11.4572 9.65303 11.403 9.62715 11.3545C9.60126 11.3059 9.56376 11.2645 9.51798 11.2339Z"
          fill="white"
        />
        <path
          d="M12.3323 4.33301H3.33235C3.14826 4.33301 2.99902 4.48224 2.99902 4.66634V5.333C2.99902 5.51709 3.14826 5.66633 3.33235 5.66633H12.3323C12.5164 5.66633 12.6656 5.51709 12.6656 5.333V4.66634C12.6656 4.48224 12.5164 4.33301 12.3323 4.33301Z"
          fill="white"
        />
        <path
          d="M8.33288 1.01799V0.666661H8.66621C8.75461 0.666661 8.8394 0.631542 8.90191 0.56903C8.96442 0.506519 8.99954 0.421735 8.99954 0.33333C8.99954 0.244926 8.96442 0.160142 8.90191 0.0976303C8.8394 0.0351187 8.75461 0 8.66621 0H7.33289C7.24448 0 7.1597 0.0351187 7.09719 0.0976303C7.03468 0.160142 6.99956 0.244926 6.99956 0.33333C6.99956 0.421735 7.03468 0.506519 7.09719 0.56903C7.1597 0.631542 7.24448 0.666661 7.33289 0.666661H7.66622V1.01799C6.95906 1.08985 6.29327 1.38547 5.76571 1.86183C5.23815 2.33819 4.87634 2.97045 4.73291 3.66663H11.2662C11.1228 2.97045 10.7609 2.33819 10.2334 1.86183C9.70583 1.38547 9.04004 1.08985 8.33288 1.01799ZM7.56622 2.38031C7.1074 2.48272 6.69903 2.74281 6.41223 3.11531C6.35843 3.1855 6.27896 3.23145 6.19129 3.24304C6.10361 3.25464 6.01493 3.23093 5.94473 3.17714C5.87454 3.12334 5.82859 3.04387 5.81699 2.9562C5.8054 2.86852 5.82911 2.77984 5.8829 2.70964C6.26536 2.21283 6.80997 1.86591 7.42189 1.72932C7.46463 1.71984 7.50882 1.71888 7.55194 1.72648C7.59506 1.73408 7.63626 1.7501 7.67318 1.77362C7.71011 1.79715 7.74204 1.82772 7.76716 1.86358C7.79227 1.89944 7.81007 1.9399 7.81955 1.98265C7.82903 2.02539 7.82999 2.06959 7.82239 2.1127C7.81479 2.15582 7.79877 2.19702 7.77524 2.23395C7.75172 2.27087 7.72115 2.3028 7.68529 2.32792C7.64942 2.35303 7.60896 2.37084 7.56622 2.38031Z"
          fill="white"
        />
        <path
          d="M15.833 3.56032C15.7705 3.48916 15.6936 3.43217 15.6074 3.39313C15.5212 3.3541 15.4276 3.33393 15.333 3.33398H14.9733C14.8272 3.33475 14.6854 3.38347 14.5697 3.47266C14.4541 3.56185 14.3709 3.68657 14.333 3.82765L13.4706 7.04829H11.4143C11.1931 7.04851 10.9782 7.12232 10.8036 7.25811C10.6289 7.3939 10.5044 7.58393 10.4497 7.79828L10.3547 8.16728C10.3292 8.26575 10.3267 8.36873 10.3472 8.46835C10.3677 8.56796 10.4107 8.66156 10.473 8.74199C10.5352 8.82241 10.615 8.88753 10.7063 8.93236C10.7976 8.97718 10.898 9.00053 10.9997 9.0006H11.0227L10.379 11.5866C10.3684 11.6291 10.3663 11.6733 10.3728 11.7166C10.3794 11.7599 10.3943 11.8015 10.4169 11.839C10.4395 11.8765 10.4693 11.9092 10.5046 11.9352C10.5398 11.9612 10.5798 11.98 10.6223 11.9906C10.6487 11.9973 10.6758 12.0007 10.703 12.0006C10.7773 12.0006 10.8496 11.9757 10.9081 11.9299C10.9667 11.8841 11.0083 11.8201 11.0263 11.7479L11.7087 9.0006H14.0996L14.7083 11.7396C14.7247 11.8135 14.7658 11.8796 14.8248 11.927C14.8838 11.9745 14.9572 12.0004 15.033 12.0006C15.0574 12.0005 15.0818 11.9979 15.1056 11.9926C15.1484 11.9831 15.1888 11.9653 15.2247 11.9402C15.2606 11.9151 15.2911 11.8832 15.3147 11.8462C15.3382 11.8093 15.3542 11.7681 15.3618 11.725C15.3694 11.6819 15.3684 11.6377 15.359 11.5949L14.771 8.9496C14.9508 8.89232 15.1107 8.78533 15.2323 8.64099C15.3538 8.49666 15.4321 8.32087 15.458 8.13394L15.9939 4.08998C16.0065 3.99531 15.9986 3.89906 15.9709 3.80769C15.9431 3.71633 15.8961 3.63198 15.833 3.56032Z"
          fill="white"
        />
        <path
          d="M5.52645 8.74294C5.58912 8.66254 5.63245 8.56881 5.65309 8.46898C5.67372 8.36916 5.67111 8.26593 5.64545 8.16727L5.55012 7.79861C5.49548 7.58426 5.37105 7.3942 5.19644 7.25841C5.02184 7.12261 4.80699 7.0488 4.58579 7.04862H2.53081L1.66849 3.82765C1.63051 3.6863 1.54707 3.56138 1.43104 3.47216C1.31501 3.38294 1.17285 3.33439 1.02649 3.33398H0.664495C0.569698 3.33429 0.476057 3.35481 0.38982 3.39418C0.303583 3.43355 0.226733 3.49085 0.164398 3.56227C0.102063 3.63369 0.0556766 3.71758 0.0283337 3.80835C0.000990764 3.89912 -0.00667974 3.99468 0.00583399 4.08864L0.541829 8.13394C0.567368 8.32095 0.645309 8.49691 0.766643 8.64148C0.887977 8.78606 1.04775 8.89334 1.22749 8.95093L0.639495 11.5949C0.620311 11.6812 0.636206 11.7716 0.683684 11.8463C0.731162 11.9209 0.806332 11.9736 0.892659 11.9927C0.978987 12.0119 1.0694 11.996 1.14401 11.9486C1.21861 11.9011 1.27131 11.8259 1.29049 11.7396L1.89982 9.0006H4.2918L4.97546 11.7479C4.99349 11.8202 5.03524 11.8844 5.09403 11.9302C5.15282 11.976 5.22526 12.0008 5.29979 12.0006C5.32699 12.0007 5.3541 11.9973 5.38045 11.9906C5.42294 11.98 5.46292 11.9612 5.49813 11.9351C5.53333 11.9091 5.56307 11.8764 5.58563 11.8389C5.6082 11.8014 5.62315 11.7598 5.62964 11.7165C5.63613 11.6732 5.63403 11.6291 5.62345 11.5866L4.97812 9.0006H5.00146C5.10287 9.00085 5.20299 8.97774 5.29403 8.93306C5.38508 8.88837 5.46461 8.82332 5.52645 8.74294Z"
          fill="white"
        />
      </svg>
    </Box>
  );
}

export default memo(DineInIcon);