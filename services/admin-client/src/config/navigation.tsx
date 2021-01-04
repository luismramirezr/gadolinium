import React from 'react';
import { AppsOutlined, DashboardOutlined } from '@material-ui/icons';

export interface NavigationLink {
  i18n: string;
  route?: string;
  icon?: React.ReactNode;
  subItems?: Array<NavigationLink>;
}

const navigationLinks: Array<NavigationLink> = [
  {
    i18n: 'Dashboard',
    route: '/',
    icon: <DashboardOutlined />,
  },
  {
    i18n: 'Catalog.Title',
    route: '/catalog',
    icon: <AppsOutlined />,
    subItems: [
      {
        i18n: 'Catalog.Categories',
        route: '/catalog/categories',
      },
      {
        i18n: 'Catalog.Products',
        route: '/catalog/products',
      },
    ],
  },
];

export default navigationLinks;
