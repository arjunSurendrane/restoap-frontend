// eslint-disable-next-line import/no-unresolved
import { Box, Grid, Switch } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
// eslint-disable-next-line import/no-unresolved
// import { RHFAutocomplete } from 'src/components/hook-form';
// eslint-disable-next-line import/no-unresolved
import { PATH_DASHBOARD } from 'src/routes/paths';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
// eslint-disable-next-line import/no-import-module-exports
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-import-module-exports
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../redux/store';

// eslint-disable-next-line import/no-unresolved
import { getPermissions, assignPermision } from '../../redux/slices/permission';
import { getRoleById } from '../../redux/slices/role';
import navConfig from '../../layouts/dashboard/nav/config-navigation';
import CustomButton from '../../components/button/CustomButton';
// import SvgColor from '../../components/svg-color/SvgColor';

export default function Permissions() {
  const params = useParams();
  const dispatch = useDispatch();

  console.log('navConfig', navConfig);
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  const [expanded, setExpanded] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    // console.log('expandedasdasd', event, newExpanded);
    // setExpanded(newExpanded ? panel : false);
    if (!expanded.includes(panel)) {
      setExpanded((prev) => [...prev, panel]);
    } else {
      console.log('else', panel);
      // expanded.splice(panel
      const filtered = expanded.filter((val) => val !== panel);
      console.log('filtered', filtered);
      setExpanded(filtered);
    }
  };

  useEffect(() => {
    dispatch(getPermissions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRoleById(params.roleId));
  }, [dispatch, params.roleId]);
  const notifySuccess = (message) => toast.success(message);
  const { Permission } = useSelector((state) => state.Permission);
  const { role } = useSelector((state) => state.role);
  const [permissionKey, setPermissionKey] = useState([]);
  const [newPermission, setNewPermission] = useState([]);
  const [count, setCount] = useState(0);
  console.log('Permissionsadasdas', role);

  const mainPermissionKey = {
    Order: 'MANAGE_ORDERS',
    Menu: 'MENU_READ',
    Dashboard: 'DASHBOARD_READ',
    Settings: 'SETTINGS_READ',
    Dining: 'DINING_READ',
    User: 'USER_READ',
    Kitchen: 'KITCHEN_READ',
  };
  // const mainPermissionName = {
  //   Order: 'MANAGE_ORDERS',
  //   Menu: 'MENU_READ',
  //   Dashboard: 'DASHBOARD_READ',
  //   Settings: 'INTEGRATE_PAYMENT_GATEWAY',
  //   Dining: 'DINING_READ',
  //   User: 'USER_READ',
  // };
  const modulesList = [
    {
      name: 'Dashboard',
      key: 'Dashboard',
      index: 1,
    },
    // {
    //   name: 'Stores',
    //   key: 'my_Store',
    //   index: '2',
    // },
    {
      name: 'Settings',
      key: 'Settings',
      index: 2,
    },
    {
      name: 'Dining',
      key: 'Dining',
      index: 3,
    },

    {
      name: 'Menu',
      key: 'Menu',
      index: 4,
    },
    {
      name: 'User',
      key: 'User',
      index: 5,
    },
    {
      name: 'Order',
      key: 'Order',
      index: 6,
    },
    {
      name: 'Kitchen',
      key: 'Kitchen',
      index: 7,
    },
  ];
  const evenModules = modulesList.filter((module) => module.index % 2 === 0);
  const oddModules = modulesList.filter((module) => module.index % 2 === 1);
  console.log('oddModules', oddModules);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (role?.permissions) {
      const updatedPermissionKey = [];

      role?.permissions.forEach((key) => {
        updatedPermissionKey.push(key);
      });

      setPermissionKey(updatedPermissionKey);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, params.roleId]);
  console.log('permissionKey', permissionKey);
  const groupedPermissions = Permission?.reduce((acc, item, index) => {
    if (!acc[item.module]) {
      acc[item.module] = [];
    }
    acc[item.module].push(item);
    return acc;
  }, {});

  console.log('permissionKey array', permissionKey);
  // eslint-disable-next-line no-lone-blocks
  const handleAssign = async (e, key, module) => {
    console.log('e value', e.target.checked);
    console.log('permission new', e, key, module);
    console.log('main key', key);
    if (key.includes('_READ') || key === 'MANAGE_ORDERS') {
      console.log('main key');
      if (e.target.checked) {
        setPermissionKey((oldArray) => [...oldArray, key]);
      } else {
        // const updatedPermissionKey = permissionKey?.filter((item) =>
        //   groupedPermissions[module].includes((data) => data.key === key)
        // );
        const updatedPermissionKey = groupedPermissions[module].map((order) => order.key);
        console.log('updatedPermissionKey', updatedPermissionKey);
        const filteredKeys = permissionKey?.filter(
          (keyName) => !updatedPermissionKey.includes(keyName)
        );
        setPermissionKey(filteredKeys);
      }
    } else {
      console.log('Not a main key');
      if (e.target.checked) {
        const mainKey = mainPermissionKey[module];
        console.log('main key', mainKey);
        if (permissionKey?.includes(mainKey)) {
          console.log('already exists');
          setPermissionKey((oldArray) => [...oldArray, key]);
        } else {
          setPermissionKey((oldArray) => [...oldArray, key, mainKey]);
        }
      } else {
        const filteredKeys = permissionKey?.filter((keyName) => keyName !== key);
        setPermissionKey(filteredKeys);
      }
    }
    // if (!permissionKey?.includes(key)) {
    // if (e.target.checked) {
    //   console.log('premissionKeyarray', permissionKey);
    //   // if(module){
    //   //   Permission.includes()
    //   // }
    //   // setPermissionKey([...permissionKey, key]);
    //   // setNewPermission([...newPermission, key]);
    //   setPermissionKey((oldArray) => [...oldArray, key]);
    // } else {
    //   // let updatedPermissionKey = [];
    //   // console.log({ module, groupedPermissions });
    //   // if (module) {
    //   // updatedPermissionKey = permissionKey?.filter((item) =>
    //   //   groupedPermissions[module].includes((data) => data.key === key)
    //   // );
    //   //   console.log('updatedPermissionKey', updatedPermissionKey);
    //   //   setPermissionKey(updatedPermissionKey);
    //   // } else {
    //   //   const updatedNewPermission = newPermission.filter((item) => item !== key);
    //   //   setPermissionKey(updatedNewPermission);
    //   // }
    //   // setNewPermission([...newPermission, key]);
    //   // setNewPermission(updatedNewPermission);
    // }
  };

  const handleSubmit = async () => {
    const data = {};

    data.roleId = params.roleId;
    data.permissionKey = permissionKey;
    console.log('final permission values', data);
    const res = await dispatch(assignPermision(data));
    console.log('response in da', res);
    // setPermissionKey(res?.data?.permissions);
    if (res.status === 200) {
      const message = 'Success';
      // setPermissionKey(res?.data?.permissions);
      notifySuccess(message);
    }
    // if (res.response.data.code === 409) {
    //   const message = 'Removed Permission';
    //   setPermissionKey(res?.data?.permissions);
    //   notifySuccess(message);
    // }
  };

  // const data = {};
  // data.roleId = params.roleId;
  // data.permissionId = id;
  // await dispatch(getRoleById(params.roleId));
  // console.log('permission assign', id, params.roleId);
  // };
  const module = ['Dashboard', 'my_Store', 'Settings', 'Dining', 'Menu', 'User'];

  console.log('groupedPermissions', groupedPermissions);

  return (
    <>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/Role.svg"
        heading="Roles"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD },
          {
            name: 'Roles',
            href: PATH_DASHBOARD.role,
          },
          { name: 'Permission' },
        ]}
      />
      <ToastContainer />
      <Grid sx={{ marginTop: '20px' }} container spacing={2}>
        <Grid item md={6}>
          <Grid container spacing={2}>
            {oddModules?.map((data, index) => (
              <Grid item xs={12} md={12}>
                {/* {mainPermissionKey[data.name]} */}
                <Accordion
                  expanded={
                    expanded.includes(`panel${data.index}`)
                    // permissionKey?.includes(mainPermissionKey[data.name])
                  }
                  onChange={handleChange(`panel${data.index}`)}
                  sx={{
                    border: '0.5px solid #000',
                    borderRadius: '6px',
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    // sx={{ textAlign: 'center' }}
                  >
                    <Typography>{data?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Switch
                      onClick={(e) => {
                        // handleChange(`panel${data.index}`);
                        handleAssign(e, mainPermissionKey[data.name], data.key);
                      }}
                      checked={permissionKey?.includes(mainPermissionKey[data.name])}
                    />
                    <Typography>{data?.name}</Typography> */}
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            onClick={(e) => handleAssign(e, mainPermissionKey[data.name], data.key)}
                            c
                            checked={permissionKey?.includes(mainPermissionKey[data.name])}
                          />
                        }
                        label="Read"
                      />
                    </FormGroup>
                    {Permission?.map((value) => {
                      const mainPermission =
                        value?.name === 'Read' || value?.name === 'Manage Orders';
                      return (
                        <FormGroup>
                          {data?.key === value?.module && !mainPermission ? (
                            <FormControlLabel
                              control={
                                <Switch
                                  onClick={(e) => handleAssign(e, value?.key, data.key)}
                                  checked={permissionKey?.includes(value?.key)}
                                />
                              }
                              label={value?.name}
                            />
                          ) : (
                            ''
                          )}
                        </FormGroup>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
            <Grid item md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <CustomButton value="Assign Permission" fun={handleSubmit} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container spacing={2}>
            {evenModules?.map((data, index) => (
              <Grid item xs={12} md={12}>
                {/* {mainPermissionKey[data.name]} */}
                <Accordion
                  expanded={
                    expanded.includes(`panel${data.index}`)
                    // permissionKey?.includes(mainPermissionKey[data.name])
                  }
                  onChange={handleChange(`panel${data.index}`)}
                  sx={{
                    border: '0.5px solid #000',
                    borderRadius: '6px',
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    // sx={{ textAlign: 'center' }}
                  >
                    {/* <Switch
                      onClick={(e) => {
                        // handleChange(`panel${data.index}`);
                        handleAssign(e, mainPermissionKey[data.name], data.key);
                      }}
                      checked={permissionKey?.includes(mainPermissionKey[data.name])}
                    /> */}
                    <Typography>{data?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            onClick={(e) => handleAssign(e, mainPermissionKey[data.name], data.key)}
                            c
                            checked={permissionKey?.includes(mainPermissionKey[data.name])}
                          />
                        }
                        label="Read"
                      />
                    </FormGroup>
                    {Permission?.map((value) => {
                      const mainPermission =
                        value?.name === 'Read' ||
                        value?.name === 'Manage Orders' ||
                        value.name === 'Settings Read';
                      return (
                        <FormGroup>
                          {data?.key === value?.module && !mainPermission ? (
                            <FormControlLabel
                              control={
                                <Switch
                                  onClick={(e) => handleAssign(e, value?.key, data.key)}
                                  checked={permissionKey?.includes(value?.key)}
                                />
                              }
                              label={value?.name}
                            />
                          ) : (
                            ''
                          )}
                        </FormGroup>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* {modulesList?.map((data, index) => (
          <Grid item xs={12} md={6}>
            <Accordion
              expanded={expanded.includes(`panel${index}`)}
              onChange={handleChange(`panel${index}`)}
              sx={{ border: '0.5px solid #000', borderRadius: '6px' }}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{data?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Permission?.map((value) => (
                  <FormGroup>
                    {data?.key === value?.module && (
                      <FormControlLabel
                        control={
                          <Switch
                            onClick={(e) => handleAssign(e, value?.key)}
                            checked={permissionKey?.includes(value?.key)}
                          />
                        }
                        label={value?.name}
                      />
                    )}
                  </FormGroup>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))} */}
      </Grid>
    </>
  );
}
