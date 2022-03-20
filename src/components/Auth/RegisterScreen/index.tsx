import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import { Typography } from '@mui/material';
import validationSchema from '../ValidationSchema';
import image from '../design/Hero_img.jpg';
import { ReactComponent as Logo } from '../design/logo.svg';
import PasswordToggle from '../PasswordToggle';
import app from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';

const RegisterScreen: React.FC = () => {
  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const handleSignIn = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, fullName } = event.target.form;
      try {
        const authenticate = await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        await authenticate?.user?.updateProfile({
          displayName: fullName.value,
        });

        history.push('/');
      } catch (error) {
        setAlert({
          show: true,
          severity: 'warning',
          message: `${error}`,
        });
      }
    },
    [history, setAlert],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img alt="hero" src={image} width="100%" />
      </Grid>
      <Grid item xs={6}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          paddingLeft="20%"
          paddingRight="20%"
        >
          <Box
            display="flex"
            flexDirection="column"
            paddingTop="100px"
            textAlign="center"
          >
            <Logo />
          </Box>
          <Box paddingTop="50px" paddingBottom="50px">
            <Typography variant="h3">Register</Typography>
          </Box>
          <Box width="100%">
            <Formik
              initialValues={{
                email: '',
                password: '',
                repeatedPassword: '',
                fullName: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => {
                const commonTextFieldProps: TextFieldProps = {
                  autoComplete: 'off',
                  required: true,
                  fullWidth: true,
                  size: 'small',
                  margin: 'normal',
                  color: 'info',
                  onChange: handleChange,
                  onBlur: handleBlur,
                };
                return (
                  <form>
                    <TextField
                      type="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      error={Boolean(errors.email && touched.email)}
                      helperText={errors.email}
                      {...commonTextFieldProps}
                    />
                    <TextField
                      type="fullName"
                      name="fullName"
                      label="Full Name"
                      value={values.fullName}
                      error={Boolean(errors.fullName && touched.fullName)}
                      helperText={errors.fullName}
                      {...commonTextFieldProps}
                    />
                    <PasswordToggle
                      label="Password"
                      name="password"
                      helperText={errors.password}
                      error={Boolean(errors.password && touched.password)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <PasswordToggle
                      label="Repeat your password"
                      name="repeatedPassword"
                      helperText={errors.repeatedPassword}
                      error={Boolean(
                        errors.repeatedPassword && touched.repeatedPassword,
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.repeatedPassword}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={handleSignIn}
                      disabled={isSubmitting}
                    >
                      Register
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
