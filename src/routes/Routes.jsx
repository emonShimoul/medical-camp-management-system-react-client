import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import OrganizerDashboardLayout from "../layout/OrganizerDashboardLayout";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";

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
            <AvailableCamps></AvailableCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "/campDetails/:id",
        element: (
          <PrivateRoute>
            <CampDetails></CampDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camp/${params.id}`),
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
      {
        path: "addCamp",
        element: <AddCamp></AddCamp>,
      },
    ],
  },
]);
