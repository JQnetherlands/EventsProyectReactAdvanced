import {
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { messages } from "@/utils/messages";
import { updateEvent } from "@/api/events";
import { EventFormFields } from "./EventFormFields";
import { useEvents } from "@/context/EventsContext";
import { useEventForm } from "@/hooks/useEventForm";
import { BaseDialog } from "./BaseDialog";
import { showToast } from "@/utils/showToast";

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
      showToast.validation.required(messages.validation.labels[error.field])
      
      return 
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
  );
};
