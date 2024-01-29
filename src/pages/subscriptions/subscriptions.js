/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Switch, Container, Typography, Stack, useTheme, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _pricingPlans } from '../../_mock/arrays';
// sections
import Header from '../../layouts/pricing/header/Header';
import Skeleton from '../../theme/overrides/Skeleton';
import Page404 from '../Page404';
import { SkeltonForPricingPage } from '../../components/skeleton';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { fetchPlans } from '../../redux/slices/subscription';
import { PricingPlanCard } from '../../sections/subscriptions';
import { useAuthContext } from '../../auth/useAuthContext';
// ----------------------------------------------------------------------

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('month');
  const { user } = useAuthContext();
  const theme = useTheme();

  const { countryCode } = useSelector((state) => state.countryCode);

  console.log({ countryCode });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);
  let { loading, error, plans } = useSelector((state) => state.subscription);

  const handlePricingPeriod = (e) => {
    e.target.checked ? setSelectedPlan('year') : setSelectedPlan('month');
  };

  const showErrorResponse = (data) => {
    toast.error(data || 'Something gone wrong. Try again...');
  };

  if (error) return <Page404 />;
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title> Pricing | RestoAp</title>
      </Helmet>

      {user?.plan?.planId ? (
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/Dash_Vec.svg"
          heading="Subscriptions"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.dashboard,
            },
            {
              name: 'Billing',
            },
            {
              name: 'Subscriptions',
              href: PATH_DASHBOARD.billing.subscriptionPlan,
            },
          ]}
        />
      ) : (
        <Header />
      )}
      {/* Custom breadcrumbs */}

      {/* <Header /> */}
      <Container
        sx={
          user?.plan?.planId
            ? {
                pt: 1,
                //   minHeight: 1,
              }
            : { pt: 3, pb: 5 }
        }
      >
        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!user?.plan?.planId ? (
            <>
              <Typography variant="h3" align="center" paragraph sx={{ mt: 10 }}>
                Flexible plans for your
                <br /> community&apos;s size and needs
              </Typography>

              <Typography align="center" sx={{ color: 'text.secondary' }}>
                Choose your plan and make modern online conversation magic
              </Typography>
            </>
          ) : (
            ''
          )}

          <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Typography variant="overline" sx={{ mr: 1.5 }}>
                MONTHLY
              </Typography>

              <Switch onChange={handlePricingPeriod} />
              <Typography variant="overline" sx={{ ml: 1.5 }}>
                YEARLY (save 10%)
              </Typography>
            </Stack>

            <Typography
              variant="caption"
              align="right"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              * Plus applicable taxes
            </Typography>
          </Box>
        </Grid>

        {plans.length ? (
          <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
            {plans.map((card, index) => (
              <Grid item sx={12} md={4} lg={4}>
                <PricingPlanCard
                  key={card._id}
                  card={card}
                  index={index}
                  selectedPlan={selectedPlan}
                  showErrorResponse={showErrorResponse}
                />
              </Grid>
            ))}
          </Box>
        ) : (
          // </Container>
          <SkeltonForPricingPage />
        )}
      </Container>
    </>
  );
}
