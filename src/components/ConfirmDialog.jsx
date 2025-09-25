/**
 * ConfirmDialog.jsx
 * -----------------
 * A reusable confirmation dialog built on top of BaseDialog.
 *
 * Features:
 * - Displays a message (description) asking the user to confirm an action.
 * - Customizable confirm button label, color, and dialog title.
 * - Uses `useDialogConfig` hook to generate consistent footer buttons (Confirm/Cancel).
 * - Closes automatically after confirm or cancel.
 *
 * Typical usage:
 * <ConfirmDialog
 *    isOpen={isDeleteOpen}
 *    setIsOpen={setIsDeleteOpen}
 *    title="Delete Event"
 *    description="Are you sure you want to delete this event?"
 *    onConfirm={handleDelete}
 *    confirmLabel="Delete"
 *    confirmColor="red"
 * />
 */

import { Text } from "@chakra-ui/react";
import { BaseDialog } from "./BaseDialog";
import { useDialogConfig } from "@/hooks/useDialogConfig";

export const ConfirmDialog = ({
  isOpen, // Boolean: whether the dialog is open
  setIsOpen, // Function: updates the open state (close on confirm/cancel)
  title = "Confirm", // Title text for the dialog header
  description, // String: body text explaining what is being confirmed
  onConfirm, // Function: action to perform on confirm
  confirmLabel = "Confirm", // Label for the confirm button
  confirmColor = "red", // Color scheme for the confirm button
}) => {
  // Called when user confirms (executes action, then closes dialog)
  const handleConfirm = async () => {
    await onConfirm();
    setIsOpen(false);
  };

  // Hook generates dialog config: title, footer with buttons
  const { size, footer } = useDialogConfig({
    title,
    onSave: handleConfirm, // confirm action
    onCancel: () => setIsOpen(false), // cancel closes dialog
    saveLabel: confirmLabel, // confirm button label
    saveColor: confirmColor, // confirm button color
    cancelLabel: "Cancer", // cancel button label
  });
  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size={size}
      title={title}
      footer={footer}
    >
      {/* Description text inside the dialog body */}
      <Text>{description}</Text>
    </BaseDialog>
  );
};
