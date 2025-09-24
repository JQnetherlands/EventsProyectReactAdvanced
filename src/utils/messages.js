export const messages = {
  validation: {
    labels: {
      title: "Title",
      description: "Description",
      location: "Location",
      startTime: "Start time",
      endTime: "End time",
      categories: "Categories",
    }
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