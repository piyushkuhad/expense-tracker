import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user.user);
  const Component = props.component;

  const isAuthenticated = Object.keys(user).length === 0 ? false : true;

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: '/auth' }} />
  );
};

export default ProtectedRoute;
