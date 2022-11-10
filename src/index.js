import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Pronosticos } from "./pages/Pronosticos";
import { Resultados } from "./pages/Resultados";
import { AuthProvider } from "./context/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/mis-pronosticos",
    element: <Pronosticos />,
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/resultados",
    element: <Resultados />,
    errorElement: <NotFound></NotFound>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
