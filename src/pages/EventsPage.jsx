import {
  Heading,
  VStack,
  Box,
  Image,
  Text,
  SimpleGrid,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddEventDialog } from "@/components/AddEventDialog";
import { useLoaderData } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
export const loader = async function getEventList() {
  const [fetchEventsResponse, fetchCategories] = await Promise.all([
    fetch("http://localhost:3000/events"),
    fetch("http://localhost:3000/categories"),
  ]);

  const [events, categories] = await Promise.all([
    fetchEventsResponse.json(),
    fetchCategories.json(),
  ]);

  const enrichedEvents = events.map((event) => {
    const eventCategories = event.categoryIds.map((id) => {
      const category = categories.find((c) => c.id === id);
      return category.name;
    });
    return { ...event, eventCategories };
  });
  return { events: enrichedEvents, categories };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  console.log(events, categories);
  const renderEvents = events.map((event) => {
    return (
      <LinkBox
        as={"article"}
        key={event.id}
        borderWidth={"1px"}
        borderRadius={"md"}
        overflow={"hidden"}
        w={"full"}
        bg={"white"}
        shadow={{ base: "sm", md: "md" }}
        _hover={{
          shadow: "lg",
          transform: "translateY(-2px)",
          transition: "all 0.2s",
        }}
        cursor={"pointer"}
      >
        <AspectRatio ratio={16 / 9}>
          <Image src={event.image} alt={event.title} objectFit={"cover"} />
        </AspectRatio>
        <Box p={4}>
          <Heading as={"h3"} size={"sm"} color={"gray.700"}>
            <LinkOverlay as={RouterLink} to={`/event/${event.id}`}>
              {event.title}
            </LinkOverlay>
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color={"gray.600"}>
            {event.description}
          </Text>
          <Text fontSize={"xs"} color={"gray.500"}>
            start time:{" "}
            {new Date(event.startTime).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>
          <Text fontSize={"xs"} color={"gray.500"}>
            end time:{" "}
            {new Date(event.endTime).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>
          <Text fontSize={"xs"} mt={1}>
            Category: {event.eventCategories.join(", ")}
          </Text>
        </Box>
      </LinkBox>
    );
  });
  return (
    <VStack
      gap={4}
      w={{ base: "95%", sm: "90%", md: "80%" }}
      maxW={{ base: "480px", md: "720px", lg: "1024px" }}
      mx={"auto"}
      p={2}
    >
      <Heading size={"md"} textAlign={"center"} my={2}>
        List of events
      </Heading>

      <Button colorPalette={"teal"} onClick={() => setIsOpen(true)}>
        {" "}
        ➕ Add Event{" "}
      </Button>
      <AddEventDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w={"full"}>
        {renderEvents}
      </SimpleGrid>
    </VStack>
  );
};
