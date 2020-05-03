import React from 'react';
import { Route } from 'react-router-dom';

import SignUp from './SignUp';

const CustomRoutes = [
  <Route
    key="register"
    exact
    path="/register"
    noLayout
    render={(props) => <SignUp {...props} />}
  />,
];

export default CustomRoutes;
