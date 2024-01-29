import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box, Grid, useMediaQuery } from '@mui/material';
// components
import Image from '../../components/image';

//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import Logo2 from '../../components/logo/Logo2';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  // const matches = useMediaQuery('(min-width:600px)');
  const isMobileScreen = useMediaQuery('(max-width:425px)');
  const isTabletScreen = useMediaQuery('(min-width: 425px) and (max-width: 768px)');
  const laptopScreen = useMediaQuery('(min-width:1440px)');
  // backgroundColor: 'linear-gradient(167deg, #EEF3F9 0%, #FFFFFD 100%)',
  // eslint-disable-next-line consistent-return
  const year = new Date();
  return (
    <StyledRoot>
      <Grid container>
        {!isMobileScreen && !isTabletScreen && (
          <Grid item sm={0} md={4} lg={7} xl={7}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                position: 'relative',
              }}
            >
              <img
                src="/assets/images/Login/login.png"
                alt="logo"
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  // bottom: '15%',
                  left: '10%',
                  height: '640px',
                  width: 'auto',
                }}
              />
            </Box>
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={8} lg={5} xl={5}>
          <StyledContent style={{ width: !isMobileScreen ? '100%' : '' }}>
            <Stack> {children} </Stack>
          </StyledContent>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
            Copyright © {year.getFullYear()} RestoAp | All Rights Reserved | Design & Developed By
            <a
              style={{ textDecoration: 'none' }}
              href="https://b-jelt.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ color: '#BB3138' }}>B-JeLT Technologies Pvt Ltd</span>
            </a>
          </Typography>
        </Box>
      </Grid>
    </StyledRoot>
  );
}
