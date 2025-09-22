import {
  Dialog,
  Portal,
  Button,
  useBreakpointValue,
  CloseButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/UI/toaster";
import { updateEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEvents } from "@/context/EventsContext";
import { useEventForm } from "@/hooks/useEventForm";
import { BaseDialog } from "./BaseDialog";

export const EditEventDialog = ({
  isOpen,
  setIsOpen,
  event,
  allCategories,
}) => {
  const { submitAndUpdate } = useEvents();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  const { form, handleChange, fieldErrors, validate, formToPayload } =
    useEventForm(event);

  const handleSave = async () => {
    const error = validate();
    if (error) {
      return toaster.create({
        title: "Validation Error",
        description: error.message,
        type: "error",
        closable: true,
      });
    }

    const payload = formToPayload();
    try {
      await submitAndUpdate(() => updateEvent(event.id, payload));
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const buttons = (
    <>
      <Button variant={"ghost"} onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button colorPalette={"teal"} onClick={handleSave}>
        Save
      </Button>
    </>
  );

  return (
    <BaseDialog
      isOpen={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size={dialogSize}
      title="Edit Event"
      footer={buttons}
    >
      <EventFormFields
        form={form}
        onChange={handleChange}
        allCategories={allCategories}
        fieldErrors={fieldErrors}
      />
    </BaseDialog>
    // <Dialog.Root
    //   size={dialogSize}
    //   open={isOpen}
    //   onOpenChange={(e) => setIsOpen(e.open)}
    // >
    //   <Portal>
    //     <Dialog.Backdrop />
    //     <Dialog.Positioner>
    //       <Dialog.Content borderRadius={"lg"} p={4}>
    //         <Dialog.Header>
    //           <Dialog.Title>Edit Event</Dialog.Title>
    //         </Dialog.Header>

    //         <Dialog.Body>
    //           <EventFormFields
    //             form={form}
    //             onChange={handleChange}
    //             allCategories={allCategories}
    //             fieldErrors={fieldErrors}
    //           />
    //         </Dialog.Body>

    //         <Dialog.Footer display={"flex"} justifyContent={"flex-end"} gap={2}>
    //           <Button
    //             variant={"ghost"}
    //             onClick={() => {
    //               toaster.create({
    //                 title: "Edit cancelled",
    //                 description: "No changes were saved",
    //                 type: "info",
    //                 duration: 3000,
    //                 closable: true,
    //               });
    //               setIsOpen(false);
    //             }}
    //           >
    //             Cancel
    //           </Button>
    //           <Button colorPalette={"teal"} onClick={handleSave}>
    //             Save Changes
    //           </Button>
    //         </Dialog.Footer>

    //         <Dialog.CloseTrigger>
    //           <CloseButton
    //             size={"sm"}
    //             onClick={() =>
    //               toaster.create({
    //                 title: "Edit cancelled",
    //                 description: "No changes were saved",
    //                 type: "info",
    //                 duration: 3000,
    //                 closable: true,
    //               })
    //             }
    //           />
    //         </Dialog.CloseTrigger>
    //       </Dialog.Content>
    //     </Dialog.Positioner>
    //   </Portal>
    // </Dialog.Root>
  );
};
