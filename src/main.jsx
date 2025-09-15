import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, loader as eventsPostLoader } from "./pages/EventsPage";
import { loader as postLoader } from "./pages/EventPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { Provider } from "./components/UI/provider";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPostLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
