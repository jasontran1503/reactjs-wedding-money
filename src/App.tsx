import Loading from 'layouts/Loading';
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const NotFound = React.lazy(() => import('./layouts/NotFound'));

const App = () => {
  const routes = useRoutes([
    // {
    //   path: '',
    //   element: <Navigate to=""></Navigate>
    // },
    {
      path: '/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <MainLayout />
        </React.Suspense>
      )
    },
    {
      path: '404',
      element: (
        <React.Suspense fallback={<Loading />}>
          <NotFound />
        </React.Suspense>
      )
    },
    {
      path: '*',
      element: <Navigate to="404"></Navigate>
    }
  ]);

  return (
    <>
      {routes}
      <ToastContainer />
    </>
  );
};

export default App;
