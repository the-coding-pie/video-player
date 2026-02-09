import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/error";
import NotFound from "../pages/not-found";

const HomePage = lazy(() => import("../pages/home/index"));
const DetailPage = lazy(() => import("../pages/watch/[id]"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "watch/:id",
        Component: DetailPage,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
