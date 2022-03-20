import { createTheme } from '@mui/material';

const colors = {
  primaryMain: '#004dc9',
  contrastText: '#ffffff',
  secondaryMain: '#ffffff',
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: colors.primaryMain,
      contrastText: colors.contrastText,
    },
    secondary: {
      main: colors.secondaryMain,
    },
  },
});

export default defaultTheme;
