import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import { toaster } from "./UI/toaster";
export const BaseDialog = ({isOpen, onOpenChange, title, children, footer, size = "md"}) => {
    return (
      <Dialog.Root size={size} open={isOpen} onOpenChange={onOpenChange}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius={"lg"} p={{ base: 3, md: 4, lg: 6 }}>
              <Dialog.Header>
                <Dialog.Title fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                  {title}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>{children}</Dialog.Body>

              {footer && <Dialog.Footer>{footer}</Dialog.Footer>}

              <Dialog.CloseTrigger
                asChild
                onClick={() => {
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
}