import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Mainlayout from './Layout/Mainlayout';
import Category from './pages/Category';
import Testimonial from './pages/Testimonial';
import Errorpage from './pages/Errorpage';
import Joblist from './pages/Joblist';
import Jobdetail from './pages/Jobdetail';
import Profile from './pages/Profile';
import Postjb from './pages/Postjb';
import Dispost from './pages/Dispost';
import Viewdt from './pages/Viewdt';
import Editpost from './pages/Editpost';
import List from './pages/List';
import Editprofile from './pages/Editprofile';
import Status from './pages/Status';
import Viewpost from './pages/Viewpost';
import Fget from './pages/Fget'; 
import Resetpswd from './pages/Resetpswd';
import Ch from './pages/Ch';

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: (
          <>

            <Home />
          </>
        )
      },
      {
        path: "about",
        element: <About />
      },

      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "register",
        element: <Registration />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "getProfile",
        element: <Profile />
      },
      {
        path: "category",
        element: <Category />
      },
      {
        path: "testimonial",
        element: <Testimonial />
      },
      {
        path: "404",
        element: <Errorpage />
      },
      {
        path: "job-list",
        element: <Joblist />
      },
      {
        path: "job-detail",
        element: <Jobdetail />
      },
      {
        path: "postjob",
        element: <Postjb />
      },

      {
        path: "jobdetail/:id",
        element: <Jobdetail />
      },
      {
        path: "dpost",
        element: <Dispost />
      },
      {
        path: "view/:id",
        element: <Viewdt />
      },
      {
        path: "editpost/:id",
        element: <Editpost />
      },
      {
        path: "/list",
        element: <List />
      },
      {
        path: "/editprofile",
        element: <Editprofile />
      },
      {
        path: "/status",
        element: <Status />
      },
      {
        path: "viewpost/:id",
        element: <Viewpost />
      },
      {
        path: "/fget",
        element: <Fget />
      },
      {
        path: "/reset-password",
        element: <Resetpswd />
      },
       {
        path: "/check",
        element: <Ch />
      }
    ]
  }
])
const App = () => {
  return (
    <>
      <RouterProvider router={AppRouter} />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  )
}

export default App
