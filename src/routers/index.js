import routesConfig from '~/config/routes';
import { DefaultLayout } from '~/Layouts';
import Home from '~/Pages/Home';

const publishRoutes = [
  {
    path: routesConfig.home,
    component: Home,
    layout: DefaultLayout,
  },
];
const privateRoutes = [];

export { publishRoutes, privateRoutes };
