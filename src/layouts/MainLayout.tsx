import { MoneyProvider } from 'features/wedding-money/moneyContext';
import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { GuardRoute, GuardAuthRoute } from './GuardRoute';
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
          <GuardAuthRoute>
            <Auth />
          </GuardAuthRoute>
        </React.Suspense>
      )
    },
    {
      path: 'profile',
      element: (
        <React.Suspense fallback={<Loading />}>
          <GuardRoute>
            <Profile />
          </GuardRoute>
        </React.Suspense>
      )
    },
    {
      path: 'home/*',
      element: (
        <React.Suspense fallback={<Loading />}>
          <MoneyProvider>
            <GuardRoute>
              <Money />
            </GuardRoute>
          </MoneyProvider>
        </React.Suspense>
      )
    }
  ]);

  return (
    <>
      <Header />
      <div className="main-layout">{routes}</div>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
