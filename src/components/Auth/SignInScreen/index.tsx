import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Formik } from 'formik';
import validationSchema from '../ValidationSchema';
import image from '../design/Hero_img.jpg';
import PasswordToggle from '../PasswordToggle';
import app from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';

const SignInScreen: React.FC = () => {
  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const handleSignIn = React.useCallback(
    async (event) => {
      const { email, password } = event.target.form;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
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
          <Box paddingTop="50px" paddingBottom="50px">
            <Typography variant="h3">Login</Typography>
          </Box>
          <Box width="100%">
            <Formik
              initialValues={{ email: '', password: '' }}
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
                      label="email"
                      value={values.email}
                      error={Boolean(errors.email && touched.email)}
                      helperText={errors.email}
                      {...commonTextFieldProps}
                    />

                    <PasswordToggle
                      name="password"
                      label="password"
                      helperText={errors.password}
                      error={Boolean(errors.password && touched.password)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="button"
                      onClick={handleSignIn}
                      disabled={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </Box>
          <Box>
            <p>Don`t have an account?</p>
            <Link to="/register">Register</Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;
