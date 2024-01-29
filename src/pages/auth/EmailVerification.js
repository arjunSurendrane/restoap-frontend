/* eslint-disable react/no-unescaped-entities */
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Container, Link, Box, Stack } from '@mui/material';
// components
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from '../../components/image';
import { MotionContainer, varBounce } from '../../components/animate';
// assets
import { PageNotFoundIllustration } from '../../assets/illustrations';
import CenteredContent from '../../components/custom-styles/displayCenter';
import { PATH_AUTH } from '../../routes/paths';
import CustomButton from '../../components/button/CustomButton';
import { useAuthContext } from '../../auth/useAuthContext';
import API from '../../utils/axios';

// ----------------------------------------------------------------------

EmailVerification.propTypes = {
  email: PropTypes.number.isRequired,
};

export default function EmailVerification({ email }) {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(30);
  const { user } = useAuthContext()
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const handleSendVerificationButton = async () => {
    try {
      console.log('send verification mail')
      API.post('/auth/resend-verification-email', { email })
      setMinutes(4);
      setSeconds(30)
    } catch (error) {
      console.log({ error })
    }

  }
  const year = new Date().getFullYear();
  return (
    <>
      <Helmet>
        <title>Email Verify</title>
      </Helmet>
      <Container>
        <Stack>
          <CenteredContent>
            <Typography variant="h3" paragraph>
              Please verify <span style={{ color: '#BB3138' }}>your Email</span>
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              You're almost there! We have sent an email to
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Just click on the link in that email to complete your signup. If you don't see it,
            </Typography>
            <Typography>You may need to check your spam folder.</Typography>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              src="/assets/images/email/email-verifiaction-image.svg"
              sx={{ marginTop: '20px' }}
            />
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Still can't find the email ?
            </Typography>
            <Button size="large" variant="contained" disabled={!(minutes === 0 && seconds === 0)} onClick={handleSendVerificationButton}>
              Resend Verification Mail
            </Button>
            {seconds > 0 || minutes > 0 ? (
              <p style={{ fontSize: '12px' }}>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              ''
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                bottom: 10,
                position: 'fixed',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
                Copyright © {year} RestoAp | All Rights Reserved | Design & Developed By
                <a style={{ textDecoration: 'none' }} href="https://b-jelt.com/">
                  <span style={{ color: '#BB3138' }}>B-JeLT Technologies Pvt Ltd</span>
                </a>
              </Typography>
            </Box>
          </CenteredContent>
        </Stack>
      </Container>
    </>
  );
}
