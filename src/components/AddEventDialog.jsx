import {
  Dialog,
  Portal,
  Button,
  Input,
  VStack,
  Field,
  CloseButton,
  useBreakpointValue,
  HStack,
  CheckboxGroup,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const AddEventDialog = ({ isOpen, setIsOpen }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState([]); // selected category IDs as numbers
  const [allCategories, setAllCategories] = useState([]); // fetched categories

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setAllCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async () => {
    const newEvent = {
      title,
      description,
      startTime: startTime ? new Date(startTime) : new Date(),
      endTime: endTime ? new Date(endTime) : new Date(),
      categoryIds: categories,
      createdBy: 1,
      image: "https://placehold.co/600x400",
      location: "Unknown",
    };

    console.log("Saving event:", newEvent);

    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    setIsOpen(false);
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
          <Dialog.Content borderRadius="lg" p={4}>
            <Dialog.Header>
              <Dialog.Title>Add New Event</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack align="stretch" gap={4}>
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter event title"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Start Time</Field.Label>
                  <Input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>End Time</Field.Label>
                  <Input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Categories</Field.Label>
                  {allCategories.length > 0 ? (
                    <CheckboxGroup
                      value={categories.map(String)} // convert numbers to strings
                      onValueChange={(vals) => {
                        const numericVals = vals.map(Number); // convert back to numbers
                        console.log("onValueChange fired with:", vals);
                        console.log("Converted to numbers:", numericVals);
                        setCategories(numericVals);
                        console.log(
                          "✅ categories state updated:",
                          numericVals
                        );
                      }}
                    >
                      <HStack wrap="wrap">
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
                    <Text color="gray.500">No categories found</Text>
                  )}
                </Field.Root>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorPalette="teal" onClick={handleSave}>
                Save
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Text mt={2}>
              Selected categories: {JSON.stringify(categories)}
            </Text>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
