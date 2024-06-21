import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './Component/Main/Main.jsx';
import Home from './Component/Home/Home.jsx';
import Login from './Component/Login/Login.jsx';
import Register from './Component/Register/Register.jsx';
import AuthProvider from './Component/Auth/AuthProvider.jsx';
import Details from './Component/Details/Details.jsx';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.jsx';
import Items from './Component/Items/Items.jsx';
import Cart from './Component/Cart/Cart.jsx';
import Payment from './Component/Payment/Payment.jsx';
import NotFound from './Pages/NotFound.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        loader: ()=>fetch('/public/items.json'),
        element:<Home></Home>
      },
      {
        path:'/food/:id',        
        // loader:({params})=>fetch(`../public/items/${params.id}.json`),
        loader:()=>fetch(`/public/items.json`),
        element: <Details></Details>,

        // element:<PrivateRoute> <Details></Details> </PrivateRoute> //notDone
      }, 
      {
        path:'/item',
        element:<Items></Items>
      },
      {
        path:'/cart',
        element:<Cart></Cart>
      },
      {
        path:'/payment',
        element:<Payment></Payment>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'*',
        element:<NotFound></NotFound>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
