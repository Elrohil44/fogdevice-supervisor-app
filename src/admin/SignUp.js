import React, { useCallback, useState } from 'react';
import {
  object, shape, bool, string, func,
} from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Link, Login, useTranslate, useNotify,
} from 'react-admin';
import { Form, Field } from 'react-final-form';
import {
  TextField, CardActions, Button, CircularProgress, makeStyles,
} from '@material-ui/core';
import validator from 'validator';

import { authProvider } from '../providers';

import style from './SignUp.module.sass';

const {
  isEmail, trim, isLength, isAlphanumeric,
} = validator;

const useStyle = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const validate = ({
  username, email, password, confirmPassword,
}) => {
  const errors = {};

  if (!email) {
    errors.email = 'Required';
  } else if (!isEmail(trim(email))) {
    errors.email = 'Not a valid email';
  }
  if (!username) {
    errors.username = 'Required';
  } else if (!isAlphanumeric(username)) {
    errors.username = 'Only alphanumeric characters are allowed';
  } else if (!isLength(trim(username), { min: 5 })) {
    errors.username = 'Minimum length is 5';
  }
  if (!password) {
    errors.password = 'Required';
  } else if (!isLength(password, { min: 5 })) {
    errors.password = 'Minimum length is 5';
  }
  if (password && confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

const Input = ({
  input, meta: { touched, error }, ...restProps
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...input}
    {...restProps}
    fullWidth
  />
);

Input.propTypes = {
  input: object,
  meta: shape({
    touched: bool,
    error: string,
  }),
};

const SignUpForm = ({ handleSubmit, loading }) => {
  const translate = useTranslate();
  const { icon } = useStyle();

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={style.signUpForm}>
        <div className={style.input}>
          <Field
            id="username"
            name="username"
            autoFocus
            label={translate('ra.auth.username')}
            disabled={loading}
            component={Input}
          />
        </div>
        <div className={style.input}>
          <Field
            id="email"
            name="email"
            label="Email"
            disabled={loading}
            component={Input}
          />
        </div>
        <div className={style.input}>
          <Field
            id="password"
            name="password"
            label={translate('ra.auth.password')}
            disabled={loading}
            type="password"
            component={Input}
          />
        </div>
        <div className={style.input}>
          <Field
            id="confirm-password"
            name="confirmPassword"
            label="Confirm password"
            disabled={loading}
            type="password"
            component={Input}
          />
        </div>
      </div>
      <CardActions>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
          fullWidth
        >
          { loading && (
            <CircularProgress
              size={18}
              tickness={2}
              className={icon}
            />
          ) }
          { 'Sign Up' }
        </Button>
      </CardActions>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  loading: bool,
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const notify = useNotify();

  const onSubmit = useCallback((formData) => {
    setLoading(true);
    if (loading) return;
    authProvider.register(formData)
      .then(() => { history.push('/'); })
      .catch((error) => {
        setLoading(false);
        notify(error.message, 'warning');
      });
  }, [loading, notify, history]);

  return (
    <Login>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        component={SignUpForm}
        loading={loading}
      />
      <p className={style.signIn}>
        { 'Already have an account? ' }
        <Link to="/login">
          { 'Sign in!' }
        </Link>
      </p>
    </Login>
  );
};

export default SignUp;
