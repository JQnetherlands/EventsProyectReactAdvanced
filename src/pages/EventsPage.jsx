/**
 * EventsPage.jsx
 * -----------------
 * This page displays a **list of all events** with filtering and search options.
 * Features:
 *  - Fetches events and categories from the EventsContext.
 *  - Displays a responsive grid of event cards.
 *  - Provides:
 *    - Search by title/description
 *    - Filter by categories (checkboxes)
 *    - Add new event (opens AddEventDialog)
 *
 * State:
 *  - isOpen (boolean): controls the AddEventDialog visibility.
 *  - searchQuery (string): input for filtering events by text.
 *  - selectedCategories (array): category IDs selected for filtering.
 */
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
import { Link as RouterLink } from "react-router-dom";
import { useEvents } from "@/context/EventsContext";
import { filterEvents } from "@/utils/filterEvents";

export const EventsPage = () => {
  // Context: events, loading state, errors, and categories
  const { events, loading, error, categories } = useEvents();

  // Local state
  const [isOpen, setIsOpen] = useState(false); // Controls AddEventDialog
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories for filter

  // Loading & error states
  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text color={"red.500"}>Error: {error.message}</Text>;
  if (!events.length) return <Text>No events found</Text>;

  // Apply filters (search + categories)
  const filteredEvents = filterEvents(events, searchQuery, selectedCategories);

  /**
   * Renders a list of event cards (one per event).
   * Each card is clickable (via LinkOverlay) to navigate to EventPage.
   */
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
        {/* Event image */}
        <AspectRatio ratio={16 / 9}>
          <Image src={event.image} alt={event.title} objectFit="cover" />
        </AspectRatio>

        {/* Event details */}
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
            Location: {event.location}
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

  /**
   * Render a group of category checkboxes for filtering.
   */
  const filterCheckboxes = () => (
    <CheckboxGroup
      value={selectedCategories}
      onValueChange={(vals) => setSelectedCategories(vals.map(Number))}
    >
      <HStack wrap={"wrap"} mb={2}>
        {categories.map((cat) => (
          <Checkbox.Root key={cat.id} value={String(cat.id)}>
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
      {/* Page title */}
      <Heading size="lg" textAlign="center" my={2}>
        List of events
      </Heading>

      {/* Button to open AddEventDialog */}
      <Button colorPalette="teal" onClick={() => setIsOpen(true)}>
        ➕ Add Event
      </Button>

      {/* AddEventDialog (conditionally rendered) */}
      {isOpen && (
        <AddEventDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          allCategories={categories}
        />
      )}

      {/* Search input */}
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={2}
      />

      {/* Category filters */}
      {categories.length > 0 && filterCheckboxes()}

      {/* Event grid */}
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
