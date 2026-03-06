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

import { DomainError } from "./domainError";

// utils/validateEvent.js
export function validateEvent({
  title,
  description,
  startTime,
  endTime,
  categories,
  location,
}) {
  const errors = {};
  // Check required text fields
  if (!title?.trim())
    errors.title = new DomainError("TITLE_REQUIRED", "Title is required");
  if (!description?.trim())
    errors.description = new DomainError(
      "DESCRIPTION_REQUIRED",
      "Description is required",
    );
  if (!location?.trim()) errors.location = new DomainError(
    "LOCATION_REQUIRED",
    "Location is required",
  );
  // Check required date fields
  if (!startTime) errors.startTime = new DomainError(
    "START_TIME_REQUIRED",
    "Start time is required",
  );
  if (!endTime) errors.endTime = new DomainError("END_TIME_REQUIRED", "End time is required");
  if (!Array.isArray(categories) || categories.length === 0)
    errors.categories = new DomainError(
      "CATEGORIES_REQUIRED",
      "At least one category is required",
    );
  //   const now = new Date();

  // Convert start/end times to Date objects for comparison
  const start = new Date(startTime);
  const end = new Date(endTime);

  const startValid = !isNaN(start.getTime());
  const endValid = !isNaN(end.getTime());

  if (!errors.startTime && !errors.endTime) {
    if (startValid && endValid && start > end)
    errors.startTime = new DomainError(
      "START_AFTER_END",
      "Start time must be before end time",
    );}
  //   if (start < now)
  //     return { field: "startTime", message: "Start time must be in the future" };
  // Ensure start time is before end time

  //   if (end < now)
  //     return {
  //       field: "endTime",
  //       message: "end time must be in the future",
  //     };
  // If all checks pass, return null (valid event)
  return Object.keys(errors).length > 0 ? errors : null; // ✅ valid
}
