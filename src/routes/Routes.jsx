import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import RegisteredCamps from "../pages/ParticipantsDashboard/RegisteredCamps/RegisteredCamps";
import DashboardLayout from "../layout/DashboardLayout";
import AdminRoute from "./AdminRoute";
import ManageCamps from "../pages/Dashboard/ManageCamps/ManageCamps";
import UpdateCamp from "../pages/Dashboard/UpdateCamp/UpdateCamp";
import ParticipantProfile from "../pages/ParticipantsDashboard/ParticipantProfile/ParticipantProfile";
import Payment from "../pages/Dashboard/Payment/Payment";
import ManageRegisteredCamps from "../pages/Dashboard/ManageRegisteredCamps/ManageRegisteredCamps";
import PaymentHistory from "../pages/ParticipantsDashboard/PaymentHistory/PaymentHistory";
import Analytics from "../pages/ParticipantsDashboard/Analytics/Analytics";

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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <AdminRoute>
            <OrganizerProfile></OrganizerProfile>
          </AdminRoute>
        ),
      },
      {
        path: "participantProfile",
        element: (
          <PrivateRoute>
            <ParticipantProfile></ParticipantProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "addCamp",
        element: (
          <AdminRoute>
            <AddCamp></AddCamp>
          </AdminRoute>
        ),
      },
      {
        path: "manageCamps",
        element: (
          <AdminRoute>
            <ManageCamps></ManageCamps>
          </AdminRoute>
        ),
      },
      {
        path: "manageRegisteredCamps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoute>
        ),
      },
      {
        path: "update-camp/:id",
        element: (
          <AdminRoute>
            <UpdateCamp></UpdateCamp>
          </AdminRoute>
        ),
      },
      {
        path: "registeredCamps",
        element: (
          <PrivateRoute>
            <RegisteredCamps></RegisteredCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "analytics",
        element: <Analytics></Analytics>,
      },
    ],
  },
]);
