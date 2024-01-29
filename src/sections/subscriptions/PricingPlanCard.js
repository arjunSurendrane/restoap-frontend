import { useState } from 'react';
/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from 'prop-types';

// @mui
import { Card, Button, Typography, Box, Stack, Tooltip, Alert, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createSubscription, updateSubscription } from '../../redux/slices/subscription';
import API from '../../utils/axios';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';

// assets
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../../assets/icons';
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  sx: PropTypes.object,
  card: PropTypes.object,
  index: PropTypes.number,
  selectedPlan: PropTypes.string,
  showErrorResponse: PropTypes.func,
};

export default function PricingPlanCard({
  card,
  index,
  selectedPlan,
  showErrorResponse,
  sx,
  ...other
}) {
  console.log({ card });
  const { name, pricing, description, features } = card;
  const { user } = useAuthContext();
  const { countryCode } = useSelector((state) => state.countryCode);
  const selectedPricing = pricing.find(
    (item) => item.interval === selectedPlan && item.active === true
  );
  const { amount, intervel, id } = selectedPricing;

  console.log({
    currentPlan: card.id === user?.plan?.planId,
    cardId: card.id,
    currentId: user?.plan?.planId,
  });


 

  // console.log(first);
  const dispatch = useDispatch();
  const labelAction = 'Choose Plan';
  const navigate = useNavigate();
  console.log({ countryCode });

  // Create checkout session and redirect to stripe payment page
  const handleSubmit = async (product, plan) => {
    try {
      // api used to create checkout session
      if (!user?.plan?.planId) {
        const response = await dispatch(createSubscription(plan.id));
        console.log({ response });
        if (response.data) {
          // redirect to session.url11
          const { data } = response;
          window.location.href = data.url;
        }
      } else {
        const response = await dispatch(updateSubscription(plan.id, product.id));
        if (response.data) {
          // redirect to session.url11
          const { data } = response;
          window.location.href = data.url;
        }
      }
    } catch (error) {
      const statusCode = error?.response?.status
      let errorMessage = ''
      if(`${statusCode}`.startsWith('4')){
        errorMessage = error?.response?.data?.message
      }
      showErrorResponse(errorMessage);
    }
  };

  const boxStyle = {
    filter: 'blur(5px)',
  };

  return (
    <Box>
      <Card
        sx={{
          p: 5,
          backgroundColor: index === 1 && '#FFEEEE',
          boxShadow:
            '0px 5px 20px 0px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
          ...((index === 0 || index === 2) && {
            // boxShadow: 'none',
            bgcolor: 'background.default',
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }),
          ...sx,
        }}
        {...other}
      >
        {index === 1 && (
          <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
            POPULAR
          </Label>
        )}

        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>

        <Stack spacing={1} direction="row" sx={{ my: 2 }}>
          <Typography variant="h5">{countryCode === 'IN' ? '₹' : '$'}</Typography>

          <Typography variant="h2">
            {amount === 0 ? 'Free' : (amount / 100).toLocaleString()}
          </Typography>

          <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            {selectedPlan === 'month' ? '/mo' : '/yr'}
          </Typography>
        </Stack>

        <Typography
          variant="description"
          sx={{
            color: 'primary.main',
            textTransform: 'capitalize',
          }}
        >
          {description}
        </Typography>

        <Box sx={{ width: 80, height: 80, mt: 5 }}>
          {(name === 'Feast Master Plan' && <PlanFreeIcon />) ||
            (name === 'Culinary Pro Plan' && <PlanStarterIcon />) || <PlanPremiumIcon />}
        </Box>

        <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
          {features.map((item) => (
            <Stack
              key={item.text}
              component="li"
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                typography: 'body2',
                color: 'text.primary',
              }}
            >
              <Iconify
                icon="eva:checkmark-fill"
                width={16}
                sx={{
                  color: 'primary.main',
                }}
              />
              <Typography variant="body2">{item.name}</Typography>
            </Stack>
          ))}
        </Stack>

        <Button
          fullWidth
          disabled={card.id === user?.plan?.planId}
          size="large"
          variant="contained"
          onClick={() => handleSubmit(card, selectedPricing)}
          sx={{
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
        >
          {labelAction}
        </Button>
      </Card>
    </Box>
  );
}
