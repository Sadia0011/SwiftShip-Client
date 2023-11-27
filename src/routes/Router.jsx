import React from 'react';
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from '../Layout/Root';
import ErrorPage from '../ErrorPage/ErrorPage';
import Dashboard from '../Layout/Dashboard/Dashboard';
import Home from '../pages/Home/Home';
import BookParcel from '../Layout/Dashboard/User/BookParcel/BookParcel';
import MyParcel from '../Layout/Dashboard/User/MyParcel/MyParcel';
import Profile from '../Layout/Dashboard/User/Profile/Profile';
import MyDelivaryList from '../Layout/Dashboard/DelivaryMan/MyDelivaryList/MyDelivaryList';
import Reviews from '../Layout/Dashboard/DelivaryMan/Reviews/Reviews';
import AllUsers from '../Layout/Dashboard/Admin/AllUsers/AllUsers';
import AllDeliveryman from '../Layout/Dashboard/Admin/AllDeliveryman/AllDeliveryman';
import Statistics from '../Layout/Dashboard/Admin/Statistics/Statistics';
import Login from '../pages/SignIn/Login';
import SignUp from '../pages/SignUp/SignUp';
import UpdateParcel from '../Layout/Dashboard/User/UpdateParcel/UpdateParcel';
import DeliverymanRoute from './DeliverymanRoute';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import AdminHome from '../Layout/Dashboard/Admin/AdminHome/AdminHome';
import UseHome from '../Layout/Dashboard/User/UserHome/UseHome';
import AllOfPercels from '../Layout/Dashboard/Admin/AllOfParcels/AllOfPercels';
import DeliverymanHome from '../Layout/Dashboard/DelivaryMan/DeliverymanHome/DeliverymanHome';

  
export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
       { path:"/",
         element:<Home></Home>    
       },
       { path:"/login",
         element:<Login></Login>    
       },
       { path:"/signup",
         element:<SignUp></SignUp>  
       },

      ]
    },
    {
        path: "/dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:"user/bookParcel",
            element:<BookParcel></BookParcel>
        },
        {
            path:"user/userHome",
            element:<UseHome></UseHome>
        },
        {
            path:"user/updateParcel/:id",
            element:<UpdateParcel></UpdateParcel>,
            loader:({params})=>fetch(`http://localhost:5000/bookParcelForOneItem/${params.id}`)
        },
        {
            path:"user/myParcel",
            element:<MyParcel></MyParcel>
        },
        {
            path:"user/profile",
            element:<Profile></Profile>
        },
        {
            path:"deliveryman/deliverymanHome",
            element:<DeliverymanRoute><DeliverymanHome></DeliverymanHome> </DeliverymanRoute>
        },
        {
            path:"deliveryman/deliveryList",
            element:<DeliverymanRoute><MyDelivaryList></MyDelivaryList></DeliverymanRoute>
        },
        {
            path:"deliveryman/reviews",
            element:<DeliverymanRoute><Reviews></Reviews></DeliverymanRoute>
        },
        {
            path:"admin/adminHome",
            element:<AdminRoute><AdminHome></AdminHome> </AdminRoute>
        },
        {
            path:"admin/allParcel",
            element:<AdminRoute><AllOfPercels></AllOfPercels> </AdminRoute>
        },
        {
            path:"admin/allUsers",
            element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
            path:"admin/allDeliveryman",
            element:<AdminRoute><AllDeliveryman></AllDeliveryman></AdminRoute>
        },
        {
            path:"admin/statistics",
            element:<AdminRoute><Statistics></Statistics></AdminRoute>
        },


      ]
    }
  ]);

// export default Router;