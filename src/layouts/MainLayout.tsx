import { MoneyProvider } from 'features/wedding-money/moneyContext';
import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

const Auth = React.lazy(() => import('../features/auth/Auth'));
const Profile = React.lazy(() => import('../features/auth/components/Profile'));
const Money = React.lazy(() => import('../features/wedding-money/Money'));

const MainLayout = () => {
  const routes = useRoutes([
    {
      path: '',
      element: <Navigate to="auth"></Navigate>
    },
    {
      path: 'auth/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Auth />
        </React.Suspense>
      )
    },
    {
      path: 'profile',
      element: (
        <React.Suspense fallback={<Loading />}>
          <Profile />
        </React.Suspense>
      )
    },
    {
      path: 'home/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <MoneyProvider>
            <Money />
          </MoneyProvider>
        </React.Suspense>
      )
    }
  ]);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)',
          width: '100%'
        }}
      >
        {routes}
      </div>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
