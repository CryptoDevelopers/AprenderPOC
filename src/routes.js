import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Upload = Loadable({
  loader: () => import('./views/Upload'),
  loading: Loading,
});

const Video = Loadable({
  loader: () => import('./views/Video'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Homepage = Loadable({
  loader: () => import('./views/Pages/Homepage'),
  loading: Loading,
});

const Account = Loadable({
  loader: () => import('./views/Account'),
  loading: Loading,
})

const Account2 = Loadable({
  loader: () => import('./views/Account2'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/home', name: 'Homepage', component: Homepage },
  { path: '/account81', name: 'Account', component: Account },
  { path: '/account37', name: 'Account2', component: Account2 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/upload', name: 'Upload', component: Upload },
  { path: '/videos', name: 'Video', component: Video },
  ];

export default routes;
