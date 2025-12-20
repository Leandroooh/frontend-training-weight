import { createBrowserRouter } from "react-router-dom";
import "./globals.css";

import { WorkoutsProvider } from "./hooks/useWorkouts";
import { DashboardLayoutApp } from "./layouts/DashboardLayout";
import DashboardPage from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { WorkoutPage } from "./pages/Workout";
import { PrivateRoute } from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <WorkoutsProvider>
          <DashboardLayoutApp />
        </WorkoutsProvider>
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // /dashboard
        element: <DashboardPage />,
      },
      {
        path: "workout/:id", // /dashboard/workout/:id
        element: <WorkoutPage />,
      },
    ],
  },
]);

export { router };
