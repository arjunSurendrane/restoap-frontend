import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { getRoles } from 'src/redux/slices/role';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from '../../../redux/store';
// utils
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
import Iconify from '../../../components/iconify/Iconify';
import user, { createUser } from '../../../redux/slices/user';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

UserCreateForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  storeId: PropTypes.string,
};

export default function UserCreateForm({ isEdit = false, currentUser, storeId }) {
  console.log('user add', isEdit, currentUser, storeId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState({});
  const [uloadImage, setUploadImage] = useState();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').trim(),
    lastName: Yup.string().required('Last Name is required').trim(),
    email: Yup.string().required('Email is required').email('Invalid Email'),
    phone: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Invalid mobile number'),

    password: Yup.string()
      .required('Password is required')
      .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' '))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    // roles: Yup.object().shape({
    //   id: Yup.string().required('Role Is Required'),
    // }),
    roles: Yup.string().required('Role is required'),
    avatarUrl: Yup.string().nullable(true),
    isisEmailVerified: Yup.string(),
    storeId: Yup.string(),
  });

  const defaultValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    roles: '',
    password: currentUser?.password || '',
    avatarUrl: currentUser?.avatarUrl || null,
    isisEmailVerified: currentUser?.isVerified || true,
    storeId: storeId.id || '',
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
  useEffect(() => {
    dispatch(getRoles(storeId.id));
  }, [dispatch, storeId]);
  const { roles } = useSelector((state) => state.role);

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);
  const onSubmit = async (data) => {
    try {
      data.roles = [data.roles];

      // await new Promise((resolve) => setTimeout(resolve, 500));
      data.storeId = [storeId.id];
      const formData = new FormData();
      formData.append('avatarUrl', uloadImage);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('roles', JSON.stringify([data.roles]));
      formData.append('password', data.password);
      formData.append('storeId', data.storeId);
      formData.append('isEmailVerified', true);
      // eslint-disable-next-line no-restricted-syntax

      const res = await dispatch(createUser(formData));
      const { message } = res.data;

      if (res.status === 201) {
        reset();
        localStorage.setItem('tabValue', 'Users');
        toast.success('User Create Successfully!');
        navigate(`/dashboard/branches/profile/${data.storeId}`);
        // navigate(PATH_DASHBOARD.user.list);
        // navigate(-1);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('error in', error);
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
      <Grid marginTop="15px" container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

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

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            {/* <RHFSwitch
                                name="isVerified"
                                labelPlacement="start"
                                label={
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                            Email Verified
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Disabling this will automatically send the user a verification email
                                        </Typography>
                                    </>
                                }
                                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                            /> */}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ minHeight: '356px', p: 3 }}>
            <Box
              rowGap={4}
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
              <RHFTextField size="small" name="phone" label="Phone Number" />

              {/* <RHFSelect
                native
                name="roles"
                label="Role"
                InputLabelProps={{ shrink: true }}
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="" />
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
                getOptionLabel={(role) => role.name}
              </RHFSelect> */}

              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Role</InputLabel> */}
                <RHFSelect
                  size="small"
                  labelId="demo-simple-select-label"
                  // native
                  id="demo-simple-select"
                  name="roles"
                  label="Role"
                  // onChange={handleChange}
                >
                  {roles.map((role) => (
                    <MenuItem value={role.id}> {role.name}</MenuItem>
                  ))}
                </RHFSelect>
              </FormControl>

              <RHFTextField
                size="small"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                onClick={console.log('button called')}
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
