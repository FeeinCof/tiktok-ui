import { DefaultLayout } from '~/Layouts';
import Home from '~/Pages/Home';

const publishRoutes = [
  {
    path: '/',
    component: Home,
    layout: DefaultLayout,
  },
];
const privateRoutes = [];

export { publishRoutes, privateRoutes };
