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
import { useDialogConfig } from "@/hooks/useDialogConfig";

export const AddEventDialog = ({ isOpen, setIsOpen, allCategories = [] }) => {
  const { submitAndAdd } = useEvents(); // Context method to add event + toast feedback

  // Local form state & helpers
  const {
    form,
    handleChange,
    handleImageUpload,
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
    
    if (validate()) return;

    // Build payload with safe defaults
    const payload = formToPayload({
      createdBy: 1, // default user
      image: form.uploadedImage || image, // Default fallback image
      location: form.location || "Unknown", // Ensure location not empty
    });

    // Submit event via context
    await submitAndAdd(() => createEvent(payload));

    // Reset form + close dialog
    resetForm();
    setIsOpen(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
    showToast.cancel();
  };

  const handleOpenChange = (e) => {
    if (!e.open) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  // Configure dialog layout and footer buttons
  const { size, footer, title } = useDialogConfig({
    title: "Add New Event",
    onSave: handleSave,
    onCancel: handleCancel,
  });

  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange} // Keep sync with state
      onClose={handleCancel}
      size={size}
      title={title}
      footer={footer}
    >
      {/* Reusable form fields component */}
      <EventFormFields
        form={form}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        allCategories={allCategories}
        fieldErrors={fieldErrors}
      />
    </BaseDialog>
  );
};
