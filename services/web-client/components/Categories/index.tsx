import { Box, Grid } from '@material-ui/core';
import React from 'react';
import CategoryCard from './components/CategoryCard';

const Categories: React.FC = () => {
  return (
    <Box py={3}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <CategoryCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoryCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoryCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Categories;
