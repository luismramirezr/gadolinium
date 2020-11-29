import React from 'react';
import { Box, Card, CardMedia, Typography } from '@material-ui/core';

import useStyles from './styles';

const CategoryCard: React.FC = () => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.categoryCard}>
      <CardMedia
        image="https://picsum.photos/600/400"
        className={classes.categoryCardImage}
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          p={2}
        >
          <Typography variant="h6" className={classes.categoryText}>
            Category
          </Typography>
        </Box>
      </CardMedia>
    </Card>
  );
};

export default CategoryCard;
