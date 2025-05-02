import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import OrganizerDashboardLayout from "../layout/OrganizerDashboardLayout";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";

export const router = createBrowserRouter([
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
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/camps",
        element: (
          <PrivateRoute>
            <h1>Camps</h1>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <OrganizerDashboardLayout></OrganizerDashboardLayout>,
    children: [
      {
        path: "profile",
        element: <OrganizerProfile></OrganizerProfile>,
      },
    ],
  },
]);
