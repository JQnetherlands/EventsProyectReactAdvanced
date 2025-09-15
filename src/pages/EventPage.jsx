import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Heading,
  Box,
  Text,
  AspectRatio,
  Image,
  VStack,
  Button,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/UI/toaster";
import { EditEventDialog } from "@/components/EditEventDialog"; // we’ll create this next

export const loader = async ({ params }) => {
  const [eventRes, categoriesRes, usersRes] = await Promise.all([
    fetch(`http://localhost:3000/events/${params.eventId}`),
    fetch(`http://localhost:3000/categories`),
    fetch(`http://localhost:3000/users`),
  ]);

  const [event, categories, usersData] = await Promise.all([
    eventRes.json(),
    categoriesRes.json(),
    usersRes.json(),
  ]);

  const eventCategories = event.categoryIds.map((id) => {
    const category = categories.find(
      (categoryObject) => id === categoryObject.id
    ).name;
    return category;
  });

  const users = usersData;
  console.log(usersData);

  const creator = users.find((user) => user.id === event.createdBy);

  return { ...event, eventCategories, creator, allCategories: categories };
};

export const EventPage = () => {
  const initialEvent = useLoaderData();
  const navigate = useNavigate();

  console.log(initialEvent);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [event, setEvent] = useState(initialEvent);

  const handleEventUpdated = (savedEvent) => {
    const eventCategories = savedEvent.categoryIds.map(
      (id) => initialEvent.allCategories.find((c) => c.id === id)?.name
    );
    setEvent((prev) => ({
      ...savedEvent,
      eventCategories,
      creator: prev.creator,
    }));
  };

  const handleDelete = async () => {
    try {
      const fetchEvent = async () => {
        const res = await fetch(`http://localhost:3000/events/${event.id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete event");
        return res.json();
      };
      const promise = fetchEvent();

      toaster.promise(promise, {
        loading: { title: "Deleting event...", description: "Please wait" },
        success: {
          title: "Event deleted",
          description: "The event was removed successfully",
        },
        error: {
          title: "Delete failed",
          description: "Something went wrong while deleting the event",
        },
      });

      await promise;
      navigate("/"); // this is the correct url
    } catch (err) {
      console.error(err);
    }
  };

  console.log(event);
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

      <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} color={"gray.600"}>
        Categories: {event.eventCategories.join(", ")}
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
          allCategories={initialEvent.allCategories}
          onEventUpdated={handleEventUpdated}
        />
      )}

      <Dialog.Root
        open={isDeleteOpen}
        onOpenChange={(e) => setIsDeleteOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius={"lg"} p={{ base: 3, md: 4, lg: 6 }}>
              <Dialog.Header>
                <Dialog.Title fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                  Delete Event
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Text>
                  Are you sure you want to delete <b>{event.title}</b>? This
                  action cannot be undone.
                </Text>
              </Dialog.Body>

              <Dialog.Footer
                display={"flex"}
                justifyContent={"flex-end"}
                gap={2}
              >
                <Button
                  variant={"ghost"}
                  onClick={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </Button>

                <Button colorPalette={"red"} onClick={handleDelete}>
                  Delete
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
};
