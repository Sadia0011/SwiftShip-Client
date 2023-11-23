import React from 'react';
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from '../Layout/Root';
import ErrorPage from '../ErrorPage/ErrorPage';
import Dashboard from '../Layout/Dashboard/Dashboard';
import Home from '../pages/Home/Home';

  
export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
       { path:"/",
         element:<Home></Home>    
       },

      ]
    },
    {
        path: "/dashboard",
      element: <Dashboard></Dashboard>
    }
  ]);

// export default Router;