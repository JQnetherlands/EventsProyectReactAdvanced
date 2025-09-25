/**
 * Root.jsx
 * --------
 * The root layout component of the app.
 *
 * Responsibilities:
 * - Provides a consistent navigation bar (`<Navigation />`) at the top of every page.
 * - Uses React Router's `<Outlet />` to render the currently active route.
 * - Wraps everything in a Chakra `<Box>` for layout consistency.
 *
 * Example usage in router:
 * {
 *   path: "/",
 *   element: <Root />,
 *   children: [
 *     { path: "", element: <EventsPage /> },
 *     { path: "categories", element: <CategoriesPage /> },
 *   ]
 * }
 */
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      {/* Top navigation bar (always visible) */}
      <Navigation />
      {/* React Router will render the matched child route here */}
      <Outlet />
    </Box>
  );
};
