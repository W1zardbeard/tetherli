import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login.jsx';
import Register from "./pages/Register.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import Editor from './pages/Editor.jsx';
import ProfileDetails from './pages/ProfileDetails.jsx';
import TestProfilePage from './pages/TestProfilePage.jsx';
import Preview from './pages/Preview.jsx';
import SharePage from './pages/SharePage.jsx';
import UserNotFound from './pages/UserNotFound.jsx';





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
    path: "/admin",
    element: <Editor />
  },
  {
    path: "/admin/profileDetails",
    element: <ProfileDetails />
  },
  {
    //see how youre using preview here!!!! use it for the actual render
    path: "/user/test",
    element: <TestProfilePage />
  },
  {
    path: "/preview/:username",
    element: <Preview />
  },
  {
    path: "/:username",
    element: <SharePage />
  },
  {
    path: "/user-not-found",
    element: <UserNotFound />
  }

]);




ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <RouterProvider router={router} />
  
    </>
    

)
