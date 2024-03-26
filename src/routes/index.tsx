import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../Provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../component/Pages/Home";
import Logout from "../component/SignUp-SignIn/Logout";

import SignUp from "../component/SignUp-SignIn/SignUp";
import MyNavBar from "../component/Header/MyNavBar";
import SignIn from "../component/SignUp-SignIn/SignIn";
import Food from "../component/Pages/Food";
import Profile from "../component/Pages/Profile";



const Routes = () => {


  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/signin",
      element: <SignIn/>,
    },
    {
      path: "/signup",
      element: <SignUp/>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      
      path: "/",
      element: (
        <>
          <MyNavBar /> {/* Include the NavBar component */}
          <ProtectedRoute />
        </>
      ), // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: `/home`,
          element: <Home/>,
        },
        {
          path: `/food/:id`,
          element: <Food/>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: `/user/:id`,
          element: <Profile/>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    
    
    {
      path: "/logout",
      element: <Logout />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;