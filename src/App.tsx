import { createBrowserRouter } from "react-router-dom";
import "./globals.css";
import DashboardPage from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { PrivateRoute } from './utils/PrivateRoute';

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
      <DashboardPage />
    </PrivateRoute>
  ),
}

]);
export { router };
