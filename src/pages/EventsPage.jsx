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
  Input,
  Checkbox,
  CheckboxGroup,
  HStack,
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
  const { events: initialEvents, categories } = useLoaderData();
  const [events, setEvents] = useState(initialEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      event.categoryIds.some((id) => selectedCategories.includes(id));
    
    return matchesSearch && matchesCategory
  });
  const renderEvents = filteredEvents.map((event) => {
    return (
      <LinkBox
        as="article"
        key={event.id}
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        w="full"
        bg="white"
        shadow={{ base: "sm", md: "md" }}
        _hover={{
          shadow: "lg",
          transform: "translateY(-2px)",
          transition: "all 0.2s",
        }}
        cursor="pointer"
      >
        <AspectRatio ratio={16 / 9}>
          <Image src={event.image} alt={event.title} objectFit="cover" />
        </AspectRatio>
        <Box p={4}>
          <Heading
            as="h3"
            fontSize={{ base: "md", md: "lg" }}
            color="gray.700"
            mb={1}
          >
            <LinkOverlay as={RouterLink} to={`/event/${event.id}`}>
              {event.title}
            </LinkOverlay>
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            color="gray.700"
            lineHeight="short"
            mb={2}
          >
            {event.description}
          </Text>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
            Start:{" "}
            {new Date(event.startTime).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
            End:{" "}
            {new Date(event.endTime).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="teal.700"
            fontWeight="semibold"
            mt={2}
          >
            Category: {event.eventCategories.join(", ")}
          </Text>
        </Box>
      </LinkBox>
    );
  });

  const filterCheckboxes = () => (
    <CheckboxGroup
      value={selectedCategories}
      onValueChange={(vals) => setSelectedCategories(vals)}
    >
      <HStack wrap={"wrap"} mb={2}>
        {categories.map((cat) => (
          <Checkbox.Root key={cat.id} value={cat.id}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{cat.name}</Checkbox.Label>
          </Checkbox.Root>
        ))}
      </HStack>
    </CheckboxGroup>
  );

  return (
    <VStack
      gap={4}
      w={{ base: "95%", sm: "90%", md: "80%" }}
      maxW={{ base: "480px", md: "720px", lg: "1024px" }}
      mx="auto"
      p={2}
    >
      <Heading size="lg" textAlign="center" my={2}>
        List of events
      </Heading>

      <Button colorPalette="teal" onClick={() => setIsOpen(true)}>
        ➕ Add Event
      </Button>

      {isOpen && (
        <AddEventDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        allCategories={categories}
        onEventAdded={(newEvent) => {
          const enrichedEvent = {
            ...newEvent,
            eventCategories: newEvent.categoryIds.map(
              (id) => categories.find((c) => c.id === id).name
            ),
          };
          setEvents([enrichedEvent, ...events]);
        }}
        />)
      }

      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={2}
      />
      {categories.length > 0 && filterCheckboxes()}
      {filteredEvents.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
          {renderEvents}
        </SimpleGrid>
      ) : (
        <Text color="gray.500" fontSize="lg" textAlign="center" mt={4}>
          No events found matching your search or selected categories.
        </Text>
      )}
    </VStack>
  );
};
