import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Button, Typography, Container } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import Image from '../../components/image';
import { MotionContainer, varBounce } from '../../components/animate';
// assets
import { PageNotFoundIllustration } from '../../assets/illustrations';
import CenteredContent from '../../components/custom-styles/displayCenter';
import API from '../../utils/axios';
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------

function ResendVerificationMail({ email }) {
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
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
            setMinutes(1);
            setSeconds(30)
        } catch (error) {
            console.log({ error })
        }

    }

    console.log({ seconds, minutes })
    return (
        <>
            <Helmet>
                <title>Email Verify</title>
            </Helmet>

            <CenteredContent>
                {/* <m.div variants={varBounce().in}> */}
                <Typography variant="h3" paragraph>
                    Please verify your email Address
                </Typography>
                {/* </m.div> */}

                {/* <m.div variants={varBounce().in}> */}
                <Typography sx={{ color: 'text.secondary' }}>
                    We have sent and verification URL to your email address
                </Typography>
                {/* </m.div> */}
                {/* <m.div variants={varBounce().in}> */}
                <Image
                    disabledEffect
                    visibleByDefault
                    alt="auth"
                    src="/assets/images/home/mailSent.gif"
                    sx={{ height: '20rem', width: '20rem' }}
                />
                {/* </m.div> */}

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
            </CenteredContent>
        </>
    );
}

ResendVerificationMail.propTypes = {
    email: PropTypes.number.isRequired,
};

export default ResendVerificationMail