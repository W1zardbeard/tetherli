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
import Editor from './pages/Editor.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import TestProfilePage from './pages/TestProfilePage.jsx';

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
  },
  {
    path: "/editor",
    element: <Editor />
  },
  {
    path: "/profileDetails",
    element: <ProfileDetails />
  },
  {
    path: "/user/:username",
    element: <TestProfilePage />
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router} />

)
