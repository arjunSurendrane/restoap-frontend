import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import RazorpayCreateSubMerchantAccount from './RazorpayCreateSubMerchantAccount';
import { useAuthContext } from '../../auth/useAuthContext';
import CustomButton from '../../components/button/CustomButton';
import { StripeIntegrate } from '../../redux/slices/StripeIntegeration';

const buttonStyle = {
  mx: 3,
  my: 3,
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', // Adjust shadow properties as needed
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: 'white',
};

const openModal = {
  Razorpay: RazorpayCreateSubMerchantAccount,
};

const ServiceCard = ({ service }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  // const [loading,]

  const handleOnclick = (name) => {
    if (name !== 'Stripe') {
      setOpen(true);
    } else {
      setIsLoading(true);
      StripeIntegrate().then((res) => {
        console.log('res in stripe', res);
        if (res.url) {
          window.location.href = res.url;

          setIsLoading(false);
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '140px',
          background:
            'linear-gradient(179deg, rgba(217, 217, 217, 0.00) 1.02%, rgba(0, 0, 0, 0.27) 99.04%)',
          boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <img
          src={service.image}
          alt=""
          style={{ opacity: service.active === false ? '0.2' : '1' }}
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'grid', justifyContent: 'right' }}>
        <CardActions>
          <LoadingButton
            disabled={!service.active}
            size="medium"
            onClick={() => handleOnclick(service.name)}
            loading={isLoading}
            sx={{
              bottom: 10,
              right: 5,
              backgroundColor: service.active ? '#BB3138' : '#D9D9D9',
              borderRadius: '5px',
              color: 'white',
              fontSize: '14px !important',
              fontWeight: 500,
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              border: '#fff 2px solid',
              '&:hover': {
                backgroundColor: '#212b36',
                color: 'white',
              },
            }}
          >
            {user.paymentAccountId ? 'View' : 'Create'}
          </LoadingButton>
        </CardActions>
      </Box>
      {service.name !== 'Stripe' ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {openModal[service.name]({ open, handleClose })}
        </Modal>
      ) : (
        ''
      )}
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object,
};
export default ServiceCard;
