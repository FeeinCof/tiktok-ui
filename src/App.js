import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoutes } from './routers';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publishRoutes.map((route, index) => {
            let Layout = !route.layout ? Fragment : route.layout;
            let Page = route.component;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                key={index}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
