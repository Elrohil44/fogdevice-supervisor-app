import React from 'react';
import { Login, LoginForm, Link } from 'react-admin';

import style from './CustomLoginPage.module.sass';

const CustomLoginPage = (props) => (
  <Login {...props}>
    <LoginForm
      redirectTo="/"
    />
    <p className={style.signUp}>
      { 'Don\'t have account? ' }
      <Link to="/register">
        { 'Sign up!' }
      </Link>
    </p>
  </Login>
);

export default CustomLoginPage;
