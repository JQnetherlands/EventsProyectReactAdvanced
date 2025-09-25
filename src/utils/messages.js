/**
 * messages.js
 * ------------
 * Centralized messages used for validation labels and event notifications.
 * This allows consistent messages throughout the application and easier
 * localization if needed in the future.
 */

export const messages = {
  // Validation messages for form fields
  validation: {
    labels: {
      title: "Title", // Label for the event title input
      description: "Description", // Label for the event description input
      location: "Location", // Label for the event location input
      startTime: "Start time", // Label for the event start time input
      endTime: "End time", // Label for the event end time input
      categories: "Categories", // Label for the event categories input
    },
  },

  // Messages for event-related actions (create, update, delete)
  event: {
    create: {
      loading: { title: "Saving event...", description: "Please wait" }, // While creating
      success: { title: "Event created", description: "Your event was saved" }, // On success
      error: { title: "Save failed", description: "Something went wrong" }, // On error
    },
    update: {
      loading: { title: "Updating event...", description: "Please wait" }, // While updating
      success: {
        title: "Event updated",
        description: "Your changes were saved",
      }, // On success
      error: { title: "Update failed", description: "Something went wrong" }, // On error
    },
    delete: {
      loading: { title: "Deleting event...", description: "Please wait" }, // While deleting
      success: { title: "Event deleted", description: "The event was removed" }, // On success
      error: { title: "Delete failed", description: "Something went wrong" }, // On error
    },
  },
};
