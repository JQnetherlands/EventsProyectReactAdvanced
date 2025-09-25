/**
 * BaseDialog.jsx
 * -----------------
 * A reusable wrapper around Chakra UI’s Dialog component.
 *
 * Features:
 * - Configurable size, title, children (body), and footer.
 * - Uses Chakra’s Portal so the dialog renders outside normal DOM flow.
 * - Includes a styled backdrop and centered positioner.
 * - Displays a toast when the dialog is closed with the CloseButton.
 *
 * This acts as the foundation for AddEventDialog, EditEventDialog, etc.
 */

import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { toaster } from "./UI/toaster";
export const BaseDialog = ({
  isOpen, // Boolean: whether the dialog is open
  onOpenChange, // Function: callback for open/close state changes
  title, // String: dialog title (header)
  children, // ReactNode: dialog body (form or content)
  footer, // ReactNode: optional footer (e.g., Save/Cancel buttons)
  size = "md", // String: dialog size (default: medium)
}) => {
  return (
    <Dialog.Root size={size} open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />

        {/* Centers the dialog on screen */}
        <Dialog.Positioner>
          <Dialog.Content borderRadius={"lg"} p={{ base: 3, md: 4, lg: 6 }}>
            {/* Header: title of the dialog */}
            <Dialog.Header>
              <Dialog.Title fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                {title}
              </Dialog.Title>
            </Dialog.Header>

            {/* Body: main content (passed as children) */}
            <Dialog.Body>{children}</Dialog.Body>

            {/* Optional footer: actions like Save/Cancel */}
            {footer && <Dialog.Footer>{footer}</Dialog.Footer>}

            {/* Close button in top-right corner */}
            <Dialog.CloseTrigger
              asChild
              onClick={() => {
                // Show a toast when user closes dialog without saving
                toaster.create({
                  title: "Cancelled",
                  description: "No changes were saved",
                  type: "info",
                  duration: 3000,
                  closable: true,
                });
              }}
            >
              <CloseButton size={"sm"} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
