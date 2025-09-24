import { fromInputDate, toInputDate } from "@/utils/dateUtils";
import { validateEvent } from "@/utils/validateEvent";
import { useState } from "react";

export function useEventForm(initial = {}) {

  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    startTime: initial.startTime ? toInputDate(initial.startTime) : "",
    endTime: initial.endTime ? toInputDate(initial.endTime) : "",
    categories: initial.categoryIds?.map(String) || [],
    uploadedImage: null,
    location: initial.location || "",
  });

  const [fieldErrors, setFieldErrors] = useState({});


  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => { // this is okay or needs to be changed chatgpt , do you understand me?
    const error = validateEvent(form);
    if (error) {
      setFieldErrors({ [error.field]: error.message });
      return error;
    }
    setFieldErrors({});
    return null;
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      categories: [],
      uploadedImage: null,
      location: "",
    });
    setFieldErrors({});
  };

  const formToPayload = (extra = {}) => ({
    ...extra,
    title: form.title,
    description: form.description,
    startTime: fromInputDate(form.startTime),
    endTime: fromInputDate(form.endTime),
    categoryIds: form.categories.map((id) => Number(id)),
    image: form.uploadedImage || initial.image || extra.image || null,
    location: form.location,
  });

  return {
    form,
    setForm,
    handleChange,
    fieldErrors,
    validate,
    resetForm,
    formToPayload,
  };
}
