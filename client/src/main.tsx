import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App/App';
import Home from './routes/Home/Home';
import Dash from './routes/Dash/Dash';
import UserDetails from './components/UserDetails/UserDetails';
import Channel from './routes/Channel/Channel';
import './index.css';



const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dash",
        element: <Dash />,
      },
      {
        path: "/user",
        element: <UserDetails />,
      },
      {
        path: "/channels/:id",
        element: <Channel />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

      <RouterProvider router={router}/>

  </React.StrictMode>
);
