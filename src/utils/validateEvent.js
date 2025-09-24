// utils/validateEvent.js
export function validateEvent({ title, description, startTime, endTime, categories, location }) {
  if (!title?.trim()) return { field: "title", message: "Title is required" };
  if (!description?.trim())
    return { field: "description", message: "Description is required" };
  if (!location?.trim())
    return { field: "location", message: "Location is required" };

  if (!startTime)
    return { field: "startTime", message: "Start time is required" };
  if (!endTime) return { field: "endTime", message: "End time is required" };
  if (!Array.isArray(categories) || categories.length === 0)
    return {
      field: "categories",
      message: "At least one category is required",
    };
  //   const now = new Date();

  const start = new Date(startTime);
  const end = new Date(endTime);

  //   if (start < now)
  //     return { field: "startTime", message: "Start time must be in the future" };
  if (start > end) {
    return {
      field: "startTime",
      message: "Start time must be before end time",
    };
  }

  //   if (end < now)
  //     return {
  //       field: "endTime",
  //       message: "end time must be in the future",
  //     };
  return null; // ✅ valid
}
