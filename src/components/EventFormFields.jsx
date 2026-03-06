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
 * - Includes console logs for debugging checkbox selection issues
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
  onImageUpload,
  allCategories = [],
  fieldErrors = {},
}) => {
  const getMessage = (error) =>
    typeof error === "string" ? error : error?.message;

  // Debug helper: logs form state and field type
  const logDebug = (vals) => {
    console.group("EventFormFields Debug");
    console.log("Current form.categories:", form.categories);
    console.log(
      "Type of each category in form.categories:",
      form.categories.map((c) => typeof c),
    );
    console.log("CheckboxGroup incoming value:", vals);
    console.log(
      "Type of each incoming value:",
      vals.map((v) => typeof v),
    );
    console.groupEnd();
  };

  return (
    <Fieldset.Root size={"lg"} maxW={"600px"} w={"full"} mx={"auto"}>
      <VStack align={"stretch"} gap={4}>
        <Fieldset.Content>
          <Field.Root invalid={!!fieldErrors.title} required>
            <Field.Label>Title</Field.Label>
            <Input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Enter event title"
            />
            {fieldErrors.title && (
              <Field.ErrorText>{getMessage(fieldErrors.title)}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!fieldErrors.description} required>
            <Field.Label>Description</Field.Label>
            <Input
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Enter event description"
            />
            {fieldErrors.description && (
              <Field.ErrorText>
                {getMessage(fieldErrors.description)}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root>
            <Field.Label>Event image</Field.Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onImageUpload(file);
                }
              }}
            />
            <Text fontSize="sm">
              If you don&apos;t upload an image, a default image will be used.
            </Text>
          </Field.Root>

          <Field.Root invalid={!!fieldErrors.location} required>
            <Field.Label>Location</Field.Label>
            <Input
              value={form.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="Enter event location"
            />
            {fieldErrors.location && (
              <Field.ErrorText>
                {getMessage(fieldErrors.location)}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!fieldErrors.startTime} required>
            <Field.Label>Start Time</Field.Label>
            <Input
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => onChange("startTime", e.target.value)}
            />
            {fieldErrors.startTime && (
              <Field.ErrorText>
                {getMessage(fieldErrors.startTime)}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!fieldErrors.endTime} required>
            <Field.Label>End Time</Field.Label>
            <Input
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => onChange("endTime", e.target.value)}
            />
            {fieldErrors.endTime && (
              <Field.ErrorText>
                {getMessage(fieldErrors.endTime)}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Fieldset.Root invalid={!!fieldErrors.categories}>
            {/* Never, take it out from the Fieldset, it will break and the bug of the first checkbox only will happens */}
            <Fieldset.Legend>Categories</Fieldset.Legend>
            <CheckboxGroup
              value={form.categories.map(String)}
              onValueChange={(vals) => {
                logDebug(vals); // log current change for debugging
                onChange("categories", vals);
              }}
            >
              <HStack wrap={"wrap"}>
                {allCategories.map((cat) => (
                  <Checkbox.Root
                    key={cat.id}
                    value={String(cat.id)}
                    invalid={!!fieldErrors.categories}
                    required
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{cat.name}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </HStack>
              {fieldErrors.categories && (
                <Fieldset.ErrorText>
                  {getMessage(fieldErrors.categories)}
                </Fieldset.ErrorText>
              )}
            </CheckboxGroup>
          </Fieldset.Root>
        </Fieldset.Content>
      </VStack>
    </Fieldset.Root>
  );
};
