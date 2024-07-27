import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login.jsx';
import Register from "./pages/Register.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainTestPage from './pages/MainTestpage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/createAccount",
    element: <Register />

  },
  {
      path: "/mainTestPage",
      element: <MainTestPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
