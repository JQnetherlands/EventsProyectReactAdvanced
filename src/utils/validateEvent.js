// utils/validateEvent.js
/**
 * validateEvent
 * --------------------
 * Validates the fields of an event object before submission.
 * Returns an object with the invalid field and a message if validation fails.
 * Returns `null` if all fields are valid.
 *
 * @param {Object} event - The event object to validate
 * @param {string} event.title - Event title
 * @param {string} event.description - Event description
 * @param {string|Date} event.startTime - Event start time
 * @param {string|Date} event.endTime - Event end time
 * @param {Array} event.categories - Array of selected category IDs
 * @param {string} event.location - Event location
 * @returns {Object|null} - { field, message } if invalid, or null if valid
 */
// utils/validateEvent.js
export function validateEvent({
  title,
  description,
  startTime,
  endTime,
  categories,
  location,
}) {
  // Check required text fields
  if (!title?.trim()) return { field: "title", message: "Title is required" };
  if (!description?.trim())
    return { field: "description", message: "Description is required" };
  if (!location?.trim())
    return { field: "location", message: "Location is required" };

  // Check required date fields
  if (!startTime)
    return { field: "startTime", message: "Start time is required" };
  if (!endTime) return { field: "endTime", message: "End time is required" };

  // Check that at least one category is selected
  if (!Array.isArray(categories) || categories.length === 0)
    return {
      field: "categories",
      message: "At least one category is required",
    };
  //   const now = new Date();

  // Convert start/end times to Date objects for comparison
  const start = new Date(startTime);
  const end = new Date(endTime);

  //   if (start < now)
  //     return { field: "startTime", message: "Start time must be in the future" };
  // Ensure start time is before end time
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
  // If all checks pass, return null (valid event)
  return null; // ✅ valid
}
