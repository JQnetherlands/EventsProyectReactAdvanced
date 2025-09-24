// utils/showToast.js
import { toaster } from "@/components/UI/toaster";
import { toastPresets } from "./toastPresets";

export const showToast = {
  cancel: () => toaster.create(toastPresets.cancel),
  error: (err) => toaster.create(toastPresets.error(err)),

  validation: {
    required: (fieldKey) =>
      toaster.create(toastPresets.validation.required(fieldKey)),
    custom: (msg) => toaster.create(toastPresets.validation.custom(msg)),
  },

  success: (msg) => toaster.create(toastPresets.success(msg)),
  info: (msg) => toaster.create(toastPresets.info(msg)),
};
