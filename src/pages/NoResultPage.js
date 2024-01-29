import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
// components
import PropTypes from 'prop-types';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

NoResultFound.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default function NoResultFound({ title, content }) {
  return (
    <>
      <Helmet>
        <title>Restoap</title>
      </Helmet>
      <MotionContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          overflow: 'hidden', 
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            textAlign: 'center',
          }}
        >
          <img
            alt="empty content"
            src="/assets/illustrations/No result.svg"
            style={{ height: '40%', width: '50%', mb: 2 }}
          />
          <Typography variant="h5" gutterBottom sx={{ color: '#BB3138' }}>
            {title}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: '#212B36', mt: 2, fontSize: '14px', fontWeight: '400' }}
          >
            {content}
          </Typography>
        </Stack>
      </MotionContainer>
    </>
  );
}
