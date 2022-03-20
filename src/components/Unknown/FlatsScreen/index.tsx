import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Box, Typography, List, Grid } from '@mui/material';
import { DocumentData } from '@firebase/firestore-types';
import { UIContext } from '../UIContext';
import AppBar from '../AppBar';
import GetFlatsList from './GetFlatsList';
import { Flat } from '../../../../types';
import FlatCard from './FlatCard';
import FlatsSearcher from './FlatsSearcher';
import FlatCardsList from './FlatCardsList';

const FlatsScreen: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = (keyword: string) => {
    if (keyword) {
      history.push({
        ...location,
        search: `query=${keyword}`,
      });
    }
  };
  return (
    <Box>
      <AppBar />
      <Grid container xs={12}>
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
