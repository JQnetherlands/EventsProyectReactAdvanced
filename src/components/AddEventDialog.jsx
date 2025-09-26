/**
 * AddEventDialog.jsx
 * -------------------
 * Dialog component for creating a new event.
 *
 * - Wraps the form fields (`EventFormFields`) inside a `BaseDialog`.
 * - Uses `useEventForm` for form state and validation.
 * - On save:
 *    → Validates fields.
 *    → Builds payload (adds defaults like `createdBy`, `image`, `location`).
 *    → Calls `createEvent` via context helper `submitAndAdd`.
 *    → Resets the form and closes the dialog.
 */

import image from "@/images/pexels-marcin-dampc-807808-1684187.jpg";
import { createEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEventForm } from "@/hooks/useEventForm";
import { useEvents } from "@/context/EventsContext";
import { BaseDialog } from "./BaseDialog";
import { showToast } from "@/utils/showToast";
import { messages } from "@/utils/messages";
import { useDialogConfig } from "@/hooks/useDialogConfig";

export const AddEventDialog = ({ isOpen, setIsOpen, allCategories = [] }) => {
  const { submitAndAdd } = useEvents(); // Context method to add event + toast feedback

  // Local form state & helpers
  const {
    form,
    handleChange,
    fieldErrors,
    validate,
    resetForm,
    formToPayload,
  } = useEventForm({});

  /**
   * Handle saving a new event.
   * - Runs validation, shows toast if invalid.
   * - Creates payload (injecting defaults).
   * - Submits event via context helper.
   * - Resets form and closes dialog if successful.
   */
  const handleSave = async () => {
    const error = validate();
    console.log("error adding event", error);
    if (error) {
      // Validation feedback
      showToast.validation.required(messages.validation.labels[error.field]);

      return;
    }

    // Build payload with safe defaults
    const payload = formToPayload({
      createdBy: 1, // default user
      image: form.uploadedImage || image, // Default fallback image
      location: form.location || "Unknown", // Ensure location not empty
    });

    try {
      // Submit event via context
      await submitAndAdd(() => createEvent(payload));

      // Reset form + close dialog
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Configure dialog layout and footer buttons
  const { size, footer, title } = useDialogConfig({
    title: "Add New Event",
    onSave: handleSave,
    onCancel: () => setIsOpen(false),
  });

  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)} // Keep sync with state
      size={size}
      title={title}
      footer={footer}
    >
      {/* Reusable form fields component */}
      <EventFormFields
        form={form}
        onChange={handleChange}
        allCategories={allCategories}
        fieldErrors={fieldErrors}
      />
    </BaseDialog>
  );
};
