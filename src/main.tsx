import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { router } from "./App.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
      <Analytics />
    </StrictMode>
  );
}
