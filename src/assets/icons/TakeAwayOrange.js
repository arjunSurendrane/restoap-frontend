import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function TakeAwayOrange({ ...other }) {
  console.log({ other });
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
      >
        <path
          d="M18.2457 0H17.4781C17.3161 0 17.1387 0.235295 17.1387 0.578593V3.49856C17.1387 3.84186 17.3161 4.07715 17.4781 4.07715H18.2457C18.4077 4.07715 18.5852 3.84186 18.5852 3.49856V0.578593C18.5852 0.235295 18.4077 0 18.2457 0Z"
          fill="#F57C24"
        />
        <path
          d="M1.43176 4.54803H9.30835L11.1367 2.71582H1.43176C1.24057 2.71619 1.05732 2.7923 0.922123 2.92749C0.786931 3.06269 0.710817 3.24594 0.710449 3.43713V3.82672C0.710813 4.01791 0.786925 4.20117 0.922119 4.33636C1.05731 4.47156 1.24057 4.54767 1.43176 4.54803Z"
          fill="#F57C24"
        />
        <path
          d="M8.50603 1.22616L6.46167 2.32934H11.6034C11.6412 2.32989 11.6779 2.3415 11.7091 2.36274C11.7403 2.38397 11.7646 2.41389 11.779 2.44879C11.7934 2.48369 11.7972 2.52205 11.79 2.5591C11.7828 2.59615 11.7649 2.63027 11.7384 2.65723L9.52436 4.87517L9.4935 4.90989C9.31439 5.09353 9.21104 5.33791 9.20404 5.59434C9.19704 5.85077 9.28691 6.10042 9.45573 6.29357C9.62455 6.48671 9.85994 6.60916 10.115 6.63653C10.3701 6.66389 10.6261 6.59416 10.832 6.44123L13.0731 4.72858C13.0895 4.7167 13.1077 4.70758 13.1271 4.70158C13.3116 4.68355 13.4972 4.67838 13.6825 4.68612C14.0741 4.68544 14.4495 4.52958 14.7264 4.25268C15.0033 3.97578 15.1592 3.60041 15.1599 3.20881C15.1596 3.18341 15.1644 3.15822 15.174 3.13471C15.1836 3.11119 15.1978 3.08983 15.2158 3.07187C15.2337 3.05391 15.2551 3.03972 15.2786 3.03011C15.3021 3.02051 15.3273 3.01569 15.3527 3.01594H16.7529V0.809573H10.1608C9.58318 0.808826 9.01446 0.952 8.50603 1.22616Z"
          fill="#F57C24"
        />
        <path d="M12.1936 19.9996H14.7278L13.4588 18.7344L12.1936 19.9996Z" fill="#F57C24" />
        <path
          d="M13.3354 5.07227L11.9236 10.3259V19.73L13.2698 18.3799V10.9546C13.2698 10.9035 13.2901 10.8544 13.3263 10.8183C13.3624 10.7821 13.4115 10.7618 13.4626 10.7618C13.5138 10.7618 13.5628 10.7821 13.599 10.8183C13.6352 10.8544 13.6555 10.9035 13.6555 10.9546V18.3876L15.0017 19.7338V10.511L13.3894 5.07227H13.3354Z"
          fill="#F57C24"
        />
        <path
          d="M11.0634 6.74656C10.8051 6.93894 10.4888 7.03697 10.167 7.0243C9.84522 7.01164 9.53753 6.88904 9.29522 6.67695C9.05291 6.46487 8.89064 6.17612 8.83547 5.85886C8.7803 5.54161 8.83556 5.21503 8.99205 4.93359L1.57444 4.93363L0.270679 9.3348C-0.201553 10.3901 0.105587 18.1627 0.0237162 19.4216C0.0236304 19.4976 0.0385409 19.5729 0.0675936 19.6431C0.0966463 19.7134 0.13927 19.7772 0.193025 19.831C0.24678 19.8847 0.310609 19.9273 0.380857 19.9564C0.451105 19.9854 0.526392 20.0003 0.602406 20.0002H11.5378V10.2991C11.5385 10.2822 11.5411 10.2653 11.5455 10.249L12.857 5.37722L11.0634 6.74656Z"
          fill="#F57C24"
        />
      </svg>
    </Box>
  );
}

export default memo(TakeAwayOrange);
