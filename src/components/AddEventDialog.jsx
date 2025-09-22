import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { toaster } from "./UI/toaster";
import image from "@/images/pexels-marcin-dampc-807808-1684187.jpg";
import { createEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEventForm } from "@/hooks/useEventForm";
import { useEvents } from "@/context/EventsContext";
import { BaseDialog } from "./BaseDialog";

export const AddEventDialog = ({ isOpen, setIsOpen, allCategories = [] }) => {
  const { submitAndAdd } = useEvents();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  const { form, handleChange, fieldErrors, validate, resetForm, formToPayload } = useEventForm({});
  console.log("[AddEventDialog] allCategories:", allCategories);
  console.log("[AddEventDialog] initial form:", form);

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

   const payload = formToPayload({
      createdBy: 1,
      image: image,
      location: form.location || "Unknown",
    })

    try {
      await submitAndAdd(
        () => createEvent(payload),
      );

      resetForm();
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
      title="Add New Event"
      footer={buttons}
    >
      <EventFormFields form={form} onChange={handleChange} allCategories={allCategories} fieldErrors={fieldErrors} />
    </BaseDialog>
    // <Dialog.Root
    //   size={dialogSize}
    //   open={isOpen}
    //   onOpenChange={(e) => setIsOpen(e.open)}
    // >
    //   <Portal>
    //     <Dialog.Backdrop />
    //     <Dialog.Positioner>
    //       <Dialog.Content borderRadius="lg" p={4}>
    //         <Dialog.Header>
    //           <Dialog.Title>Add New Event</Dialog.Title>
    //         </Dialog.Header>

    //         <Dialog.Body>
    //           <EventFormFields
    //             form={form}
    //             onChange={handleChange}
    //             allCategories={allCategories}
    //             fieldErrors={fieldErrors}
    //           />
    //         </Dialog.Body>

    //         <Dialog.Footer display="flex" justifyContent="flex-end" gap={2}>
    //           <Button
    //             variant="ghost"
    //             onClick={() => {
    //               resetForm();
    //               setIsOpen(false);
    //             }}
    //           >
    //             Cancel
    //           </Button>
    //           <Button colorPalette="teal" onClick={handleSave}>
    //             Save
    //           </Button>
    //         </Dialog.Footer>

    //         <Dialog.CloseTrigger asChild>
    //           <CloseButton size="sm" />
    //         </Dialog.CloseTrigger>
    //       </Dialog.Content>
    //     </Dialog.Positioner>
    //   </Portal>
    // </Dialog.Root>
  );
};
