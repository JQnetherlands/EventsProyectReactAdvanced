import { HStack, Link as ChakraLink, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
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
          Events
        </ChakraLink>
        <ChakraLink as={Link} to="/event/1" fontWeight={"bold"}>
          Event
        </ChakraLink>
      </HStack>
    </Box>
  );
};
