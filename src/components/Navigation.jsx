/**
 * Navigation.jsx
 * --------------
 * A simple sticky navigation bar for the app.
 *
 * Features:
 * - Always visible at the top (`position="sticky"`, `top=0`).
 * - Contains navigation links using React Router's `NavLink`.
 * - Highlights the active route with a teal color.
 * - Shows dynamic text depending on whether you're on the home route.
 *
 * Example:
 * <Navigation />
 */

import { HStack, Text, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ColorModeToggle } from "./ColorModeToggle";

export const Navigation = () => {
  return (
    <Box
      position="sticky" // keeps nav fixed to the top while scrolling
      top={0} // stick to very top of viewport
      zIndex={10} // ensures nav stays above page content
      bg={{ base: "gray.100", _dark: "gray.900" }} // ensures nav stays above page content
      w="full" // full width across the page
      p={2} // padding inside nav bar
      boxShadow="sm" // subtle shadow for elevation
    >
      {/* Horizontal stack for layout of nav items */}
      <HStack justify="space-around">
        {/* NavLink handles active state styling for routes */}
        <NavLink to="/"  end>
          {({ isActive }) => (
            <Text
              fontWeight="bold"
              color={isActive ? { base: "teal.500", _dark: "teal.300"} : { base: "gray.800", _dark: "gray.200" }} // highlight active page
            >
              {/* Change label based on active state */}
              {isActive ? "Events" : "Back to Events"}
            </Text>
          )}
        </NavLink>
        <ColorModeToggle />
      </HStack>
    </Box>
  );
};
