import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
// utils
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../../../auth/useAuthContext';
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { editUser, getUser, getUserById } from '../../../redux/slices/user';
import { getRoles } from '../../../redux/slices/role';
// import { dispatch } from '../../../redux/store';
// import { useSelector,useState } from 'react-redux';
import Iconify from '../../../components/iconify/Iconify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,

  id: PropTypes.string,
};

export default function UserNewEditForm({ isEdit = true, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { roles } = useSelector((state) => state.role);
  // const roles = ['admin', 'user'];

  const [showPassword, setShowPassword] = useState(false);
  const [initialRole, setInitialRole] = useState(user?.roles?.map((item) => item.id)[0] || '');
  const [userRole, setUserRole] = useState(initialRole || '');
  const { authUser } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const userId = id.id;
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    setUserRole(user?.roles?.map((item) => item.id)[0] || '');
  }, [user]);

  const EdiUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    password: Yup.string(),
    roles: Yup.array().nullable(true),
    avatarUrl: Yup.string().nullable(true),
    isVerified: Yup.string(),
  });

  const image = user?.avatarUrl;

  useEffect(() => {
    if (user?.storeId?.id) {
      dispatch(getRoles(user?.storeId?.id));
    }
  }, [dispatch, user?.storeId?.id]);

  const [uploadImage, setUploadImage] = useState();

  const defaultValues = {
    userId: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    roles: user ? initialRole : [],
    avatarUrl: image?.name || '',
    isVerified: user?.isEmailVerified || '',
  };
  const methods = useForm({
    resolver: yupResolver(EdiUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    handleChange,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  const handleRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  useEffect(() => {
    setValue('userId', user?.id || '');
    setValue('firstName', user?.firstName || '');
    setValue('lastName', user?.lastName || '');
    setValue('email', user?.email || '');
    setValue('phoneNumber', user?.phone || '');
    setValue('roles', initialRole || []);
    setValue('isVerified', user?.isEmailVerified || '');
    setValue('avatarUrl', image?.name || '');
  }, [user, setValue, image, initialRole]);

  const onSubmit = async (data) => {
    data.roles = [userRole];
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const formData = new FormData();
      formData.append('avatarUrl', uploadImage);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phoneNumber);
      formData.append('roles', JSON.stringify(data.roles));

      // eslint-disable-next-line no-restricted-syntax
      const res = await dispatch(editUser(user.id, formData));
      const { message } = res.data;
      // console.log('message', message);
      if (res.status === 200) {
        // enqueueSnackbar('Update success!');
        toast.success('Update Success');
        localStorage.setItem('tabValue', 'Users');
        navigate(`/dashboard/branches/profile/${user.storeId.id}`);
      } else {
        // enqueueSnackbar(message);
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadImage(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container marginTop="15px" spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, minHeight: '356px' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop="30px"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField size="small" name="firstName" label="First Name" />
              <RHFTextField size="small" name="lastName" label="Last Name" />
              <RHFTextField size="small" name="email" label="Email" />
              <RHFTextField size="small" name="phoneNumber" label="Phone Number" />
              <FormControl fullWidth>
                <RHFSelect
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  native
                  name="roles"
                  label="Role"
                  // InputLabelProps={{ shrink: true }}
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  {/* <option value="" /> */}
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                  getOptionLabel={(role) => role.name}
                </RHFSelect>
              </FormControl>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
