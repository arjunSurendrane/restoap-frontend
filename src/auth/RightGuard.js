import React from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from './useAuthContext';
import Page403 from '../pages/Page403';

const checkPermission = (userPermissions, requiredPermission) =>
  userPermissions.includes(requiredPermission);

// eslint-disable-next-line react/prop-types
const HasPermission = ({ permissionKey, children ,show403=false}) => {
  const { user } = useAuthContext();

  const userPermissions = user ? user.roles.flatMap((role) => role.permissions) : [];

  const hasPermission = checkPermission(userPermissions, permissionKey);

  if (hasPermission) {
    return <>{children}</>;
  }
  if(show403){
    return <Page403/>
  }
  return null;
  
};

HasPermission.propTypes = {
  permissionKey: PropTypes.string,
  children: PropTypes.node,
};

export default HasPermission;
