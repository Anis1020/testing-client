import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/LoginRegister.jsx/Login";
import Registration from "../pages/LoginRegister.jsx/Registration";
import AddProduct from "../pages/addProduct/AddProduct";
import AllUsers from "../pages/addProduct/allUsers/AllUsers";
import AllProducts from "../pages/allProduct/AllProducts";
import StripePayment from "../pages/Payment/StripePayment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/allProduct",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/checkout",
        element: <StripePayment></StripePayment>,
      },
    ],
  },
]);
