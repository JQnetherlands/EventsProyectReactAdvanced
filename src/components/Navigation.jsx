import { HStack, Link as ChakraLink, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box
      position="sticky"
      top={0}
      zIndex={10}
      bg="gray.100"
      w="full"
      p={2}
      boxShadow="sm"
    >
      <HStack justify="space-around">
        <NavLink to="/" end>
          {({ isActive }) => (
            <ChakraLink
              fontWeight="bold"
              color={isActive ? "teal.500" : "black"}
            >
              {isActive ? "Events" : "Back to Events"}
            </ChakraLink>
          )}
        </NavLink>
      </HStack>
    </Box>
  );
};
