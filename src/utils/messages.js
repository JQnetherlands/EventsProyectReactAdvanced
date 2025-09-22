export const messages = {
  validation: {
    title: "Title is required",
    description: "Description is required",
    location: "Location is required",
    startTime: {
      required: "Start time is required",
      invalidOrder: "Start time must be before end time",
      // future: "Start time must be in the future" // optional
    },
    endTime: {
      required: "End time is required",
      // future: "End time must be in the future" // optional
    },
    categories: "Please select at least one category",
  },

  event: {
    create: {
      loading: { title: "Saving event...", description: "Please wait" },
      success: { title: "Event created", description: "Your event was saved" },
      error: { title: "Save failed", description: "Something went wrong" },
    },
    update: {
      loading: { title: "Updating event...", description: "Please wait" },
      success: {
        title: "Event updated",
        description: "Your changes were saved",
      },
      error: { title: "Update failed", description: "Something went wrong" },
    },
    delete: {
      loading: { title: "Deleting event...", description: "Please wait" },
      success: { title: "Event deleted", description: "The event was removed" },
      error: { title: "Delete failed", description: "Something went wrong" },
    },
  },
};