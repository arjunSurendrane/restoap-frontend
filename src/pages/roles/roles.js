import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import { LoadingButton } from '@mui/lab';
import { Container, Typography, Box, useMediaQuery, Grid, Stack, Card } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';

// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { addRole, getRoles } from '../../redux/slices/role';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../components/hook-form';
import RoleListTable from '../../sections/roles/rolesList';
import RoleAddForm from '../../sections/roles/rolesAddForm';

// ----------------------------------------------------------------------

export default function RolePage() {
  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const stores = [];

  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { roles } = useSelector((state) => state.role);
  const [selectedStore, setSelectedStore] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [store, setStore] = useState('');
  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  branches?.results?.map((data) => stores.push({ id: data.id, store: data.location }));

  return (
    <>
      <Helmet>
        <title>Restoap</title>
      </Helmet>

      <>
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/Role.svg"
          heading="Roles"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
            {
              name: 'Roles',
              //   href: PATH_DASHBOARD.eCommerce.menuCreate,
            },
            { name: 'Role list' },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <RoleAddForm edit={edit} editValues={editValues} setEdit={setEdit} store={store} />
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <RoleListTable
              title="Roles List"
              tableLabels={[
                { id: 'id', label: 'Role Name' },
                { id: 'Action', label: 'Action' },
              ]}
              setEdit={setEdit}
              setEditValues={setEditValues}
              setStore={setStore}
            />
          </Grid>
        </Grid>
      </>
    </>
  );
}
