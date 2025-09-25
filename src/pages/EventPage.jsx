/**
 * EventPage.jsx
 * -----------------
 * This page shows the full details of a single event.
 * Features:
 *  - Fetches the `eventId` from the URL via react-router's useParams.
 *  - Retrieves events, categories, and loading state from EventsContext.
 *  - Displays event information (title, description, dates, location, categories, creator).
 *  - Provides buttons for editing and deleting the event.
 *  - Uses `EditEventDialog` for inline editing of event details.
 *  - Uses `ConfirmDialog` for confirming event deletion.
 *  - Calls `submitAndRemove` (with toaster integration) to delete an event safely.
 *
 * Props:
 *  - onEventDeleted (function, optional): callback called with `event.id` after successful deletion.
 */

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Heading,
  Box,
  Text,
  AspectRatio,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import { EditEventDialog } from "@/components/EditEventDialog"; // we’ll create this next
import { deleteEvent } from "@/api/events";
import { messages } from "@/utils/messages";
import { useEvents } from "@/context/EventsContext";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export const EventPage = ({ onEventDeleted }) => {
    const navigate = useNavigate();

  // Grab the eventId from the current route (e.g., /events/:eventId)
  const { eventId } = useParams();

  // Context gives us all events, categories, and helpers for mutation
  const { submitAndRemove, events, categories, loading } = useEvents();

  // While loading, display fallback
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Find the current event by ID (string cast for safety)
  const event = events.find((e) => String(e.id) === String(eventId));
  if (!event) {
    return <Text>Event no found</Text>;
  }

  // State to toggle dialogs
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Handles deletion of event (with confirmation dialog)
  const handleDelete = async () => {
    try {
      await submitAndRemove(
        () => deleteEvent(event.id), // API call
        messages.event.delete, // Toast messages
        () => event.id // Extract ID to remove from state
      );

      // onEventDeleted?.(event.id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack
      w={"full"}
      maxW={"720px"}
      mx={"auto"}
      p={4}
      mt={8}
      gap={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      shadow="sm"
    >
      {/* Title */}
      <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        {event.title}
      </Heading>

      {/* Event image */}
      <AspectRatio ratio={16 / 9} w={"full"}>
        <Image src={event.image} alt={event.title} />
      </AspectRatio>

      {/* Description */}
      <Text>{event.description}</Text>

      {/* Location */}
      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color="gray.600">
        Location: {event.location || "Unknown"}
      </Text>

      {/* Start date */}
      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.500"}>
        Start:{" "}
        {new Date(event.startTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>

      {/* End date */}
      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.500"}>
        End:{" "}
        {new Date(event.endTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>

      {/* Categories */}
      <Text>
        Categories:{" "}
        {event.eventCategories?.length > 0
          ? event.eventCategories.join(", ")
          : "Loading..."}
      </Text>

      {/* Creator info */}
      {event.creator ? (
        <Box display="flex" alignItems="center" gap={3} mt={4}>
          <Image
            src={event.creator.image}
            alt={event.creator.name}
            borderRadius="full"
            boxSize="50px"
          />
          <Text fontWeight="semibold">{event.creator.name}</Text>
        </Box>
      ) : (
        <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.600"}>
          {" "}
          The user that created this event is not in our database{" "}
        </Text>
      )}
      {/* Action buttons: Edit / Delete */}
      <Box display={"flex"} gap={2}>
        <Button
          size={{ base: "sm", md: "md", lg: "lg" }}
          colorPalette={"teal"}
          onClick={() => setIsEditOpen(true)}
        >
          Edit Event
        </Button>

        <Button
          size={{ base: "sm", md: "md", lg: "lg" }}
          colorPalette={"red"}
          onClick={() => setIsDeleteOpen(true)}
        >
          Delete Event
        </Button>
      </Box>

      {isEditOpen && (
        <EditEventDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          event={event}
          allCategories={categories}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Event"
        description={`Are you sure want to delete "${event.title}" This ation cannot be undone.`}
        onConfirm={handleDelete}
        confirmLabel="Delete"
        confirmColor="red"
      />
    </VStack>
  );
};
