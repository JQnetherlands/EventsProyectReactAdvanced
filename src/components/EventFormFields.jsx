/**
 * EventFormFields.jsx
 * -------------------
 * Presentational component that renders the form fields for an Event.
 *
 * Responsibilities:
 * - Show text inputs for title, description, location, and dates
 * - Handle image upload preview via base64
 * - Show category checkboxes dynamically
 * - Display validation errors (border red if invalid)
 *
 * Props:
 * - form: object from useEventForm (current form state)
 * - onChange: function (fieldName, value) → void
 * - allCategories: array of available categories [{ id, name }]
 * - fieldErrors: object mapping field names → error messages
 */

import {
  Field,
  Fieldset,
  Input,
  VStack,
  Text,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";

export const EventFormFields = ({
  form,
  onChange,
  allCategories = [],
  fieldErrors = {},
}) => {
  return (
    <Fieldset.Root size={"lg"} maxW={"full"}>
      <VStack align={"stretch"} gap={4}>
        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>Title</Field.Label>
            <Input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Enter event title"
              borderColor={fieldErrors.title ? "red.500" : undefined}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>description</Field.Label>
            <Input
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Enter event description"
              borderColor={fieldErrors.description ? "red.500" : undefined}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Event image</Field.Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () =>
                    onChange("uploadedImage", reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              borderColor={fieldErrors.uploadedImage ? "red.500" : undefined}
            />
            <Text fontSize="sm">
              If you don&apos;t upload an image, a default image will be used.
            </Text>
          </Field.Root>

          <Field.Root required>
            <Field.Label>Location</Field.Label>
            <Input
              value={form.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="Enter event location"
              borderColor={fieldErrors.location ? "red.500" : undefined}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Start Time</Field.Label>
            <Input
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => onChange("startTime", e.target.value)}
              borderColor={fieldErrors.startTime ? "red.500" : undefined}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>End Time</Field.Label>
            <Input
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => onChange("endTime", e.target.value)}
              borderColor={fieldErrors.endTime ? "red.500" : undefined}
            />
          </Field.Root>

          <Fieldset.Legend>Categories</Fieldset.Legend>
          {allCategories.length > 0 ? (
            <CheckboxGroup
              value={form.categories}
              onValueChange={(vals) => onChange("categories", vals)}
            >
              <HStack
                wrap={"wrap"}
                border={fieldErrors.categories ? "1px solid red" : undefined}
                borderRadius={"md"}
                p={2}
              >
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
            <Text color={"gray.500"}>No categories Found</Text>
          )}
        </Fieldset.Content>
      </VStack>
    </Fieldset.Root>
  );
};
