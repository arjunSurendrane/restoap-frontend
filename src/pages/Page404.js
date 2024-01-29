import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Grid, Box, Stack } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
      </Helmet>

      {/* <MotionContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div> */}

      {/* </MotionContainer> */}

      <Stack spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: '800px', height: '330px' }}
            src="/assets/illustrations/characters/404 Group.svg"
            alt=""
          />
        </Box>
        <Box>
          <Typography sx={{ color: '#BB3138', fontSize: '30px', fontWeight: '600' }}>
            Page Not Found
          </Typography>
        </Box>
        <Button
          sx={{
            width: '100px',
            backgroundColor: '#BB3138',
            borderRadius: '5px',
            color: '#White',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            border: '#fff 2px solid',
            '&:hover': {
              backgroundColor: '#212b36',
              color: 'white',
            },
          }}
          component={RouterLink}
          to="/"
          size="large"
          variant="contained"
        >
          Home
        </Button>
      </Stack>
    </>
  );
}
