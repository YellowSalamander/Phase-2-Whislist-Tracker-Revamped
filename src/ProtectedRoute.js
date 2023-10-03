import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
        children={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" /> // Redirect to the root directory if not logged in
        )
      }
    />
  );
};

export default ProtectedRoute;
