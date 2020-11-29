import React from 'react';
import { Box, Container } from '@material-ui/core';

import TopBar from 'components/TopBar';
import NavigationBar from 'components/NavigationBar';
import Categories from 'components/Categories';

const IndexPage = () => (
  <Box>
    <Container>
      <TopBar />
      <NavigationBar />
      <Categories />
    </Container>
  </Box>
);

export default IndexPage;
