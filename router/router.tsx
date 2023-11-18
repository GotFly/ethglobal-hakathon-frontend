import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout/Layout';
import BorrowStablecoins from '../pages/BorrowStablecoins/BorrowStablecoins';
import LendStablecoins from '../pages/LendStablecoins/LendStablecoins';
import Error from '../pages/Error/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <BorrowStablecoins />,
      },
      {
        path: '/lend-stablecoins',
        element: <LendStablecoins />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);
