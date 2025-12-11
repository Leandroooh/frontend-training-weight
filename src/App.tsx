import { createBrowserRouter } from "react-router-dom";
import "./globals.css";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
export { router };
