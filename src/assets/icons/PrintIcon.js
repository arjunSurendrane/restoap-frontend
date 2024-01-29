import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function PrintIcon({ ...other }) {
  console.log({ other });
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const WARNING_LIGHT = theme.palette.warning.light;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <g filter="url(#filter0_d_4618_12280)">
          <rect x="1" y="1" width="40" height="40" rx="8" fill="#1699D7" />
          <rect x="2" y="2" width="38" height="38" rx="7" stroke="white" strokeWidth="2" />
        </g>
        <path
          d="M27.4844 14.8672V13.9297C27.4844 12.3143 26.1701 11 24.5547 11H17.3672C15.7518 11 14.4375 12.3143 14.4375 13.9297V14.8672H27.4844Z"
          fill="white"
        />
        <path
          d="M15.6094 23.4609V28.2266V29.2422V29.8281C15.6094 30.4753 16.134 31 16.7812 31H25.1406C25.7879 31 26.3125 30.4753 26.3125 29.8281V29.2422V28.2266V23.4609H15.6094ZM22.5234 28.4609H19.3984C19.0748 28.4609 18.8125 28.1986 18.8125 27.875C18.8125 27.5514 19.0748 27.2891 19.3984 27.2891H22.5234C22.847 27.2891 23.1094 27.5514 23.1094 27.875C23.1094 28.1986 22.847 28.4609 22.5234 28.4609ZM22.5234 25.9609H19.3984C19.0748 25.9609 18.8125 25.6986 18.8125 25.375C18.8125 25.0514 19.0748 24.7891 19.3984 24.7891H22.5234C22.847 24.7891 23.1094 25.0514 23.1094 25.375C23.1094 25.6986 22.847 25.9609 22.5234 25.9609Z"
          fill="white"
        />
        <path
          d="M28.0312 16.0391H13.9297C12.3143 16.0391 11 17.3533 11 18.9688V23.6562C11 25.2717 12.3143 26.5859 13.9297 26.5859H14.4375V23.4609H14.0859C13.7623 23.4609 13.5 23.1986 13.5 22.875C13.5 22.5514 13.7623 22.2891 14.0859 22.2891H15.0234H26.8984H27.8359C28.1595 22.2891 28.4219 22.5514 28.4219 22.875C28.4219 23.1986 28.1595 23.4609 27.8359 23.4609H27.4844V26.5859H28.0312C29.6467 26.5859 30.9609 25.2717 30.9609 23.6562V18.9688C30.9609 17.3533 29.6467 16.0391 28.0312 16.0391ZM15.9609 19.7109H14.0859C13.7623 19.7109 13.5 19.4486 13.5 19.125C13.5 18.8014 13.7623 18.5391 14.0859 18.5391H15.9609C16.2845 18.5391 16.5469 18.8014 16.5469 19.125C16.5469 19.4486 16.2845 19.7109 15.9609 19.7109Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d_4618_12280"
            x="0"
            y="0"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4618_12280"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4618_12280"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(PrintIcon);
