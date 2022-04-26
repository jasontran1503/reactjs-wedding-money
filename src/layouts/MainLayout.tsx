import Profile from 'features/auth/components/Profile';
import WeddingMoney from 'features/wedding-money/WeddingMoney';
import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';

const Auth = React.lazy(() => import('../features/auth/Auth'));

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
          <WeddingMoney />
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
