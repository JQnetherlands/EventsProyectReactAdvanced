import { useParams } from "react-router-dom";
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
import {
  deleteEvent,
} from "@/api/events";
import { messages } from "@/utils/messages";
import { useEvents } from "@/context/EventsContext";
import { ConfirmDialog } from "@/components/ConfirmDialog";


export const EventPage = ({ onEventDeleted }) => {
  const { eventId } = useParams();
  const { submitAndRemove, events, categories, loading } = useEvents();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log(useParams())
  const event = events.find((e) => String(e.id) === String(eventId));
  if (!event) {
    return <Text>Event no found</Text>
  }

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await submitAndRemove(
        () => deleteEvent(event.id),
        messages.event.delete,
        () => event.id
      );
      
      onEventDeleted?.(event.id);
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
      gap={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      shadow="sm"
    >
      <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
        {event.title}
      </Heading>

      <AspectRatio ratio={16 / 9} w={"full"}>
        <Image src={event.image} alt={event.title} />
      </AspectRatio>

      <Text>{event.description}</Text>

      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color="gray.600">
        Location: {event.location || "Unknown"}
      </Text>

      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.500"}>
        Start:{" "}
        {new Date(event.startTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>

      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.500"}>
        End:{" "}
        {new Date(event.endTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </Text>

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
