import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Pronosticos } from "./pages/Pronosticos";
import { Resultados } from "./pages/Resultados";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import store from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import SnackbarCloseButton from "./components/SnackbarCloseButton";

Sentry.init({
  dsn: "https://c2b043fe413d40a8891d28659db5d93c@o4504188465709056.ingest.sentry.io/4504188466561024",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/mis-pronosticos",
    element: (
      <ProtectedRoute>
        <Pronosticos />
      </ProtectedRoute>
    ),
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "/resultados",
    element: (
      <ProtectedRoute>
        <Resultados />
      </ProtectedRoute>
    ),
    errorElement: <NotFound></NotFound>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      >
        <AuthProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
