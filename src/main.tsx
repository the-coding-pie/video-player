import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import VideoPlayer from "./components/VideoPlayer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <VideoPlayer /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);
