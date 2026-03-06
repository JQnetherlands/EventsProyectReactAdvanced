/**
 * EditEventDialog.jsx
 * -------------------
 * A dialog for editing an existing event.
 *
 * Features:
 * - Pre-populates form fields with the event's data (via useEventForm).
 * - Validates input before saving (using validateEvent + showToast).
 * - Submits changes through `submitAndUpdate` (EventsContext) + `updateEvent` API.
 * - Reuses BaseDialog for consistent modal styling and actions.
 *
 * Typical usage:
 * <EditEventDialog
 *    isOpen={isEditOpen}
 *    setIsOpen={setIsEditOpen}
 *    event={selectedEvent}
 *    allCategories={categories}
 * />
 */
import { updateEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEvents } from "@/context/EventsContext";
import { useEventForm } from "@/hooks/useEventForm";
import { BaseDialog } from "./BaseDialog";
import { showToast } from "@/utils/showToast";
import { useDialogConfig } from "@/hooks/useDialogConfig";
export const EditEventDialog = ({
  isOpen, // Boolean: whether dialog is open
  setIsOpen, // Function: controls dialog open state
  event, // Object: the event to edit
  allCategories, // Array: categories for category checkboxes
}) => {
  const { submitAndUpdate } = useEvents();

  // Custom form hook (populates form with event data)
  const { form, handleChange, handleImageUpload,fieldErrors, validate, formToPayload } =
    useEventForm(event);

  /**
   * Handle save action:
   * 1. Validate form (highlight missing fields, toast warning).
   * 2. Build payload using formToPayload().
   * 3. Submit update through EventsContext.
   * 4. Close dialog on success.
   */
  const handleSave = async () => {
    if (validate()) return;

    const payload = formToPayload();

      await submitAndUpdate(() => updateEvent(event.id, payload));
      setIsOpen(false); // close dialog on success
   
  };
  const handleCancel = () => {
    setIsOpen(false);
    showToast.cancel();
  }

  const handleOpenChange = (e) => {
    if (!e.open) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
     
  }
  // Dialog configuration (size, footer buttons, title) via shared hook
  const { size, footer, title } = useDialogConfig({
    title: "Edit Event",
    onSave: handleSave,
    onCancel: handleCancel,
  });
  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      onClose={handleCancel}
      size={size}
      title={title}
      footer={footer}
    >
      {/* Main form fields for editing event */}
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
