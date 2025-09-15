import { HStack, Link as ChakraLink, Box } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  return (
    <Box
      position={"sticky"}
      top={0}
      zIndex={10}
      bg={"gray.100"}
      w={"full"}
      p={2}
      boxShadow={"sm"}
    >
      <HStack
        justify={"space-around"}
      >
        <ChakraLink
          as={Link}
          to="/"
          fontWeight={"bold"}
          color={location.pathname === "/" ? "teal.500" : "black"}
        >
          {location.pathname === "/" ? "Events" : "Back to Events"}
        </ChakraLink>
      </HStack>
    </Box>
  );
};
