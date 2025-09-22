import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { Root } from "./components/Root";
import { Provider } from "./components/UI/provider";
import { EventsProvider } from "./context/EventsContext";
import { Toaster } from "@/components/ui/toaster";

function EventPageWrapper() {
  const navigate = useNavigate();
  return (
    <EventPage
      onEventDeleted={(deletedId) => {
       if (deletedId) navigate("/");
      }}    
    />
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />
      },
      {
        path: "/event/:eventId",
        element: <EventPageWrapper />,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <EventsProvider>
        <Toaster />
        <RouterProvider router={router} />
      </EventsProvider>
    </Provider>
  </React.StrictMode>
);
