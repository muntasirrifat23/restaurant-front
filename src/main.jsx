import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Component/Main/Main.jsx";
import Home from "./Component/Home/Home.jsx";
import Login from "./Component/Login/Login.jsx";
import Register from "./Component/Register/Register.jsx";
import AuthProvider from "./Component/Auth/AuthProvider.jsx";
import Details from "./Component/Items/Details.jsx";
import Items from "./Component/Items/Items.jsx";
import Cart from "./Component/Cart/Cart.jsx";
import Payment from "./Component/Payment/Payment.jsx";
import NotFound from "./Header/NotFound.jsx";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute.jsx";
import Reserve from "./Component/Reserve/Reserve.jsx";
import Admin from "./Dashboard/Admin/Admin.jsx";
import Customer from "./Dashboard/Customer.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddItems from "./Dashboard/AddItems/AddItems.jsx";
import AllItems from "./Dashboard/AllItems/AllItems.jsx";
import UpdateItems from "./Dashboard/UpdateItems/UpdateItems.jsx";
import AdminPrivate from "./Dashboard/AdminPrivate/AdminPrivate.jsx";
import Revenue from "./Dashboard/Revenue/Revenue.jsx";
import Orders from "./Component/Orders/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        loader: () => fetch("/public/items.json"),
        element: <Home></Home>,
      },
      {
        path: "/items/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`https://restaurant-backend-pearl.vercel.app/items/${params.id}`),
      },
      {
        path: "/items",
        loader: async () => {
            try {
                const response = await fetch("https://restaurant-backend-pearl.vercel.app/items");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return await response.json();
            } catch (error) {
                console.error("Failed to fetch items:", error);
                return []; // Return an empty array or handle error as appropriate
            }
        },
        element: <Items></Items>,
    },
    
      // {
      //   path: "/items",
      //   loader: () => fetch("https://restaurant-backend-pearl.vercel.app/items"),
      //   element: <Items></Items>,
      // },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/order",
        element: <Orders></Orders>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/reserve",
        element: <PrivateRoute><Reserve></Reserve></PrivateRoute>,
      },

      // Admin Dashboard
      {
        path: "/admin",
        element: <AdminPrivate><Admin></Admin> </AdminPrivate>,
      },
      {
        path: "/users",
        element: <Customer></Customer>,
      },
      {
        path:"/revenue",
        element:<Revenue></Revenue>
      },
      {
        path: "/allItems",
        loader: () => fetch("https://restaurant-backend-pearl.vercel.app/items"),
        element: <AdminPrivate><AllItems></AllItems></AdminPrivate>,
      },
      {
        path: "/items/:id/update",
        element:<AdminPrivate> <UpdateItems></UpdateItems></AdminPrivate>,
        loader: ({ params }) =>fetch(`https://restaurant-backend-pearl.vercel.app/items/${params.id}/update`),
      },
      {
        path: "/addItems",
        element: <AdminPrivate><AddItems></AddItems></AdminPrivate>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>
);
