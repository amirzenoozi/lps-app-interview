import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import Error from './pages/error';
import SingleServer from './pages/single-server';
import Layout from './pages/layout';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import '@icon-park/react/styles/index.css';
import './index.css';
import './i18n';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />,
            },
            {
                path: "/servers/:serverId",
                element: <SingleServer />,
                errorElement: <Error />,
            },
        ],
    },
    {
        path: "/error",
        element: <Error />,
        errorElement: <Error />,
    },
    {
        path: "*",
        element: <Error />,
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <Tooltip id="tooltip-area" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
