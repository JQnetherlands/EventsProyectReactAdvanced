// utils/showToast.js
/**
 * showToast.js
 * -------------
 * Centralized utility for showing toast notifications throughout the app.
 * Wraps the toaster component and uses predefined presets for consistency.
 */

import { toaster } from "@/components/UI/toaster";
import { toastPresets } from "./toastPresets";


export const showToast = {
  // Display a standard "cancel" toast
  cancel: () => toaster.create(toastPresets.cancel),

  // Display an error toast, optionally passing an error object/message
  error: (err) => toaster.create(toastPresets.error(err)),

  // Validation-specific toast messages
  validation: {
    // Show required field validation error
    required: (fieldKey) =>
      toaster.create(toastPresets.validation.required(fieldKey)),

    // Show custom validation error message
    custom: (msg) => toaster.create(toastPresets.validation.custom(msg)),
  },

  // Show a success toast with a custom message
  success: (msg) => toaster.create(toastPresets.success(msg)),

  // Show an info toast with a custom message
  info: (msg) => toaster.create(toastPresets.info(msg)),
};
