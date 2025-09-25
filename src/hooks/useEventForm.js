// hooks/useEventForm.js
import { fromInputDate, toInputDate } from "@/utils/dateUtils";
import { validateEvent } from "@/utils/validateEvent";
import { useState } from "react";

/**
 * useEventForm
 * - Keeps form state and field errors
 * - Exposes validate() and formToPayload(extra) helper
 */
export function useEventForm(initial = {}) {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    startTime: initial.startTime ? toInputDate(initial.startTime) : "",
    endTime: initial.endTime ? toInputDate(initial.endTime) : "",
    categories: initial.categoryIds?.map(String) || [],
    uploadedImage: null,
    location: initial.location || "",
    // Use null rather than empty string as a safer "no value" sentinel:
    createdBy: initial.createdBy ?? null,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const error = validateEvent(form);
    if (error) {
      // store message so UI can show it inline
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
      createdBy: null,
    });
    setFieldErrors({});
  };

  /**
   * formToPayload(extra)
   * - Builds API payload from current form values
   * - `extra` has priority for fields like createdBy/image/location — if you pass them they are used.
   */
  const formToPayload = (extra = {}) => {
    return {
      // Start with explicit fields we want the API to receive
      title: form.title,
      description: form.description,
      startTime: fromInputDate(form.startTime),
      endTime: fromInputDate(form.endTime),
      categoryIds: form.categories.map((id) => Number(id)),
      // image priority: uploadedImage (user), then extra.image (caller), then initial.image (edit case)
      image: form.uploadedImage ?? extra.image ?? initial.image ?? null,
      // location priority: form value, then extra override
      location: form.location || extra.location || initial.location || null,
      // createdBy priority: the caller's explicit `extra.createdBy` should win;
      // otherwise fall back to form.createdBy, then initial.createdBy
      createdBy: extra.createdBy ?? form.createdBy ?? initial.createdBy ?? null,
      // include any other extras (but keep the explicit keys above as authoritative)
      ...extra,
    };
  };

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
