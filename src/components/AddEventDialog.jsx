import {
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { toaster } from "./UI/toaster";
import image from "@/images/pexels-marcin-dampc-807808-1684187.jpg";
import { createEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEventForm } from "@/hooks/useEventForm";
import { useEvents } from "@/context/EventsContext";
import { BaseDialog } from "./BaseDialog";
import { showToast } from "@/utils/showToast";
import { messages } from "@/utils/messages";

export const AddEventDialog = ({ isOpen, setIsOpen, allCategories = [] }) => {
  const { submitAndAdd } = useEvents();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dialogSize = isMobile ? "full" : "md";

  const { form, handleChange, fieldErrors, validate, resetForm, formToPayload } = useEventForm({});
  console.log("[AddEventDialog] allCategories:", allCategories);
  console.log("[AddEventDialog] initial form:", form);

  const handleSave = async () => {
    const error = validate();
    console.log("error adding event",error)
    if (error) {
      // showToast.validation.custom(error.message);
      console.log(error)
      showToast.validation.required(messages.validation.labels[error.field])

      return; 
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
      <Button variant={"ghost"} onClick={() => {
        showToast.cancel();
        setIsOpen(false)
      }}>
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
  );
};
