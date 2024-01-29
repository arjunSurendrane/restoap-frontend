import PropTypes from 'prop-types';
// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { StyledSubheader } from './styles';
import NavList from './NavList';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  const { translate } = useLocales();
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { permissions } = user?.roles[0];
  // const permissionKeys = permissions?.map((permission) => permission.key);
  console.log('NavSectionVertical', permissions);
  // console.log('NavSectionVertical', data);
  // const hasPermission = (permissionKey, userPermissions) => {
  //   console.log('permissionKey', permissionKey);
  //   return userPermissions.includes(permissionKey);
  // };
  const matchPermissions = data[0]?.items.filter((item) =>
    permissions?.includes(item.permissionKey)
  );
  const sideNavItems = matchPermissions.map((item) => {
    const children = item?.children?.filter((child) => permissions?.includes(child.permissionKey));
    return { ...item, children };
  });
  console.log('matchChildPermission', sideNavItems);

  return (
    <Stack sx={sx} {...other}>
      {/* {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })} */}
      {sideNavItems.map((list, idx) => (
        <List key={idx} disablePadding sx={{ px: 2 }}>
          <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
        </List>
      ))}
    </Stack>
  );
}
