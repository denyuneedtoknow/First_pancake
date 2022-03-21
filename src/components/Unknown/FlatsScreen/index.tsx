import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';

import AppBar from '../AppBar';
import FlatsSearcher from './FlatsSearcher';
import FlatCardsList from './FlatCardsList';

const FlatsScreen: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = (keyword: string) => {
    if (keyword) {
      history.push({
        ...location,
        search: `city=${keyword}`,
      });
    }
  };
  return (
    <Box>
      <AppBar />
      <Grid container item xs={12}>
        <Grid item xs={8}>
          <Typography variant="h4" mt={3} mb={3} ml={2}>
            flats for rent
          </Typography>
          <FlatsSearcher onSubmit={handleFormSubmit} />
          <FlatCardsList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlatsScreen;
