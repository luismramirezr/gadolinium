import React from 'react';

import DefaultLayout from '~/layouts/default';
import Route from '~/components/Route';

import DashBoard from '~/pages/Private/Dashboard';

const Routes: React.FC = () => (
  <DefaultLayout>
    <Route exact path="/" component={DashBoard} isPrivate />
  </DefaultLayout>
);

const PrivateRoutes: React.FC = () => (
  <Route path="/" component={Routes} isPrivate />
);

export default PrivateRoutes;
