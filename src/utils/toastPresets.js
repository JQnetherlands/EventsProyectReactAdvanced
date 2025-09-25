/**
 * toastPresets.js
 * --------------------
 * Predefined configurations for toast notifications.
 * These presets are used with a toaster component to provide
 * consistent UI messages for different actions.
 */
export const toastPresets = {
  // Preset for cancel actions
  cancel: {
    title: "Cancelled", // Title shown in the toast
    description: "No changes were saved/changed", // Detailed description
    type: "info", // Type of toast (info, error, success, etc.)
    duration: 3000, // How long the toast is displayed (ms)
    closable: true, // Whether user can manually close the toast
  },

  // Preset for errors
  error: (err) => ({
    title: err?.title || "Error", // Use provided title or default
    description: err?.message || String(err), // Use provided message or convert error to string
    type: "error",
    closable: true,
  }),

  // Presets for validation errors
  validation: {
    // Required field missing
    required: (field) => ({
      title: "Input missing",
      description: `${field} is required`,
      type: "error",
      closable: true,
    }),
    // Custom validation error
    custom: (msg) => ({
      title: "Input error",
      description: msg,
      type: "error",
      closable: true,
    }),
  },

  // Preset for success messages
  success: (msg) => ({
    title: "Success",
    description: msg,
    type: "success",
    closable: true,
    duration: 3000,
  }),

  // Preset for informational messages
  info: (msg) => ({
    title: "Info",
    description: msg,
    type: "info",
    closable: true,
    duration: 3000,
  }),
};
