import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '../AppBar';

const HomeScreen: React.FC = () => {
  return (
    <Box>
      <AppBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1">Home page</Typography>
        <Link style={{ textDecoration: 'none' }} to="/flats">
          <Button variant="contained" color="primary" type="button">
            explore flats
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default HomeScreen;
