import orderBy from 'lodash/orderBy';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Button, Container, Box, Drawer, useMediaQuery } from '@mui/material';
import Link from '@mui/material/Link';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import BreadcrumbsButton from 'src/components/button/BreadcrumsButton';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import AddBranchForm from '../../sections/branch/addBranch';
// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
// import { SkeletonPostItem } from '../../components/skeleton';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// eslint-disable-next-line import/named
import { BranchCard } from '../../sections/branch';
import LoadingScreen from '../../components/loading-screen/LoadingScreen';
import EditBranchForm from '../../sections/branch/editBranch';
import BreadcrumbsStyle from '../../components/BreadcrumbsStyle';
import HasPermission from '../../auth/RightGuard';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import { SkeletonProductItem } from '../../components/skeleton';
import BasicPagination from '../../components/pagination/pagination';
import NoResultFound from '../NoResultPage';
import StoreCardPagination from '../../components/pagination/StoreCardPagination';
import { StyledBreadCrumbsButton } from '../../theme/overrides/Button';
import SkeletonStoreCard from '../../components/skeleton/SkeltonStoreCard';

// ----------------------------------------------------------------------

export default function BranchPage() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const { branches, isLoading } = useSelector((state) => state.branch);
  const skeltonCount = [1, 2, 3, 4, 5, 6];
  const [limit, setLimit] = useState('6');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getBranches(limit, page));
  }, [dispatch, limit, page]);
  useEffect(() => {
    localStorage.setItem('tabValue', 'Tables');
  }, []);

  const notify = () => toast.error('Head Branch already Exist!');
  return (
    <>
      <Helmet>
        <title>RestoAp | Stores</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="Stores"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Stores',
            href: PATH_DASHBOARD.branch.list,
          },
        ]}
        action={
          <HasPermission permissionKey="GRANT_PERMISSION">
            <StyledBreadCrumbsButton
              component={RouterLink}
              to={PATH_DASHBOARD.storeCreate}
              variant="contained"
            >
              Add Stores
            </StyledBreadCrumbsButton>
          </HasPermission>
        }
      />

      <Grid container spacing={3}>
        {!isLoading &&
          branches?.results?.length > 0 &&
          branches?.results?.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <BranchCard index={index} branches={item} page={page} />
            </Grid>
          ))}
        {isLoading && (
          <Container>
            <Grid container spacing={2} pt={3}>
              {skeltonCount?.map(() => (
                <Grid item xs={12} md={4} lg={4}>
                  <SkeletonStoreCard />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
        {!isLoading && branches?.results?.length === 0 && (
          <Grid item xs={12} md={12} lg={12}>
            <NoResultFound
              title="No Store Added"
              content="You haven't added any stores to your account yet."
            />
          </Grid>
        )}
      </Grid>

      {branches?.results?.length > 0 && (
        <Box sx={{ marginTop: '25px' }}>
          <StoreCardPagination
            count={branches.totalPages}
            page={page}
            fun={setPage}
            setLimit={setLimit}
            totalResults={branches.totalResults}
          />
        </Box>
      )}
    </>
  );
}
