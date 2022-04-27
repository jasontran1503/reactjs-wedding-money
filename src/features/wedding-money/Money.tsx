import React from 'react';
import { useRoutes } from 'react-router-dom';
import MoneyEditor from './components/MoneyEditor';
import MoneyHome from './components/MoneyHome';

const Money = () => {
  const routes = useRoutes([
    {
      path: '',
      children: [
        { path: '', element: <MoneyHome /> },
        { path: 'editor', element: <MoneyEditor /> }
      ]
    }
  ]);

  return <div>{routes}</div>;
};

export default Money;
