import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ListItem,
  Grid,
} from '@mui/material';
import image from './standartFlat_img.jpg';
import { Flat } from '../../../../types';

const FlatCard: React.FC<Flat> = ({
  cityName,
  address,
  latitude,
  longitude,
  description,
  dailyPriceUsd,
  photoUrl,
  publishedAt,
}) => {
  return (
    <ListItem>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              width="100%"
              image={image}
              alt="flat example"
            />
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column">
              <CardContent>
                <Typography variant="h4" component="div">
                  {cityName}
                </Typography>
                <Typography variant="h5" component="div">
                  $ {dailyPriceUsd} / night
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description} Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Consequatur explicabo deserunt blanditiis
                  veniam
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Button size="small">Details</Button>
              </CardActions>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </ListItem>
  );
};
export default FlatCard;
