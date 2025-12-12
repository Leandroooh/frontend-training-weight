import { createBrowserRouter } from "react-router-dom";
import "./globals.css";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import DashboardPage from './pages/Dashboard';

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
    element: <DashboardPage />,
  },
]);
export { router };
