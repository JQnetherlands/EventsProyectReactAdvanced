import {
  Dialog,
  Portal,
  Button,
  Input,
  VStack,
  Field,
  Fieldset,
  CheckboxGroup,
  Checkbox,
  Text,
  HStack,
  useBreakpointValue,
  CloseButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/UI/toaster";
import { useState } from "react";

export const EditEventDialog = ({
  isOpen,
  setIsOpen,
  event,
  allCategories,
  onEventUpdated,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startTime, setStartTime] = useState(
    new Date(event.startTime).toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(
    new Date(event.endTime).toISOString().slice(0, 16)
  );
  const [categories, setCategories] = useState((event.categoryIds || []).map(String));
  const [uploadedImage, setUploadedImage] = useState(null);

  const finalImage = uploadedImage || event.image;

  const handleSave = async () => {
    if (!title.trim())
      return toaster.create({
        title: "Title is required",
        type: "error",
        closable: true,
      });
    if (!description.trim())
      return toaster.create({
        title: "Description is required",
        type: "error",
        closable: true,
      });
    if (!startTime)
      return toaster.create({
        title: "Start time is required",
        type: "error",
        closable: true,
      });
    if (!endTime)
      return toaster.create({
        title: "End time is required",
        type: "error",
        closable: true,
      });
    if (categories.length === 0)
      return toaster.create({
        title: "Please select at least one category",
        type: "error",
        closable: true,
      });

    const updatedEvent = {
      ...event,
      title,
      description,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      categoryIds: categories.map((id) => Number(id)),
      image: finalImage,
    };

    try {
      const fetchEvent = async () => {
        const res = await fetch(`http://localhost:3000/events/${event.id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updatedEvent),
        });

        if (!res.ok) throw new Error("Failed to Update event");
        return res.json();
      };

      //Create a promise for the toaster
      const promise = fetchEvent();

      // Attach toast messages
      toaster.promise(promise, {
        loading: { title: "Updating event...", description: "Please wait" },
        success: {
          title: "Event updated",
          description: "Your changes were saved successfully",
        },
        error: {
          title: "Update failed",
          description: "Something went wrong while updating the event",
        },
      });

      // Await the promise inside try/catch
      const savedEvent = await promise;
      
      if (onEventUpdated) onEventUpdated(savedEvent);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root
      size={dialogSize}
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius={"lg"} p={4}>
            <Dialog.Header>
              <Dialog.Title>Edit Event</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Fieldset.Root size={"lg"} maxW={"full"}>
                <VStack align={"stretch"} gap={4}>
                  <Fieldset.Content>
                    <Field.Root required>
                      <Field.Label>Title</Field.Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter event title"
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Description</Field.Label>
                      <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter event description"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Event Image</Field.Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () =>
                              setUploadedImage(reader.result);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Upload a new image to replace the current one.
                      </Text>
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>Start Time</Field.Label>
                      <Input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>End Time</Field.Label>
                      <Input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </Field.Root>

                    <Fieldset.Legend>Categories</Fieldset.Legend>
                    {allCategories.length > 0 ? (
                      <CheckboxGroup
                        value={categories}
                        onValueChange={(vals) => setCategories(vals)}
                      >
                        <HStack wrap={"wrap"}>
                          {allCategories.map((cat) => (
                            <Checkbox.Root key={cat.id} value={String(cat.id)}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{cat.name}</Checkbox.Label>
                            </Checkbox.Root>
                          ))}
                        </HStack>
                      </CheckboxGroup>
                    ) : (
                      <Text color={"gray.500"}>No categories found</Text>
                    )}
                  </Fieldset.Content>
                </VStack>
              </Fieldset.Root>
            </Dialog.Body>

            <Dialog.Footer display={"flex"} justifyContent={"flex-end"} gap={2}>
              <Button variant={"ghost"} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorPalette={"teal"} onClick={handleSave}>
                Save
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
