import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Main from "./layouts/Main.jsx";
import Login from "./components/Login/Login.jsx";
import Secret from "./components/Secret/Secret.jsx";
import AuthProvider from "./providers/AuthProviders.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/secret",
        element: <PrivateRoute><Secret></Secret></PrivateRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
