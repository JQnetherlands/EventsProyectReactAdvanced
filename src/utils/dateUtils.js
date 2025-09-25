/**
 * dateUtils.js
 * ----------------
 * Utility functions for converting between:
 *   - UTC timestamps from the database
 *   - Local datetime strings for HTML input[type="datetime-local"]
 *
 * Why this is needed:
 *   - Databases usually store dates in **UTC**.
 *   - `<input type="datetime-local">` expects a **local time string** in the format: "YYYY-MM-DDTHH:mm".
 *   - These helpers bridge the gap by adjusting for timezone offsets.
 */

/**
 * Convert a UTC ISO string (from DB) → Local datetime string (for input field).
 *
 * Example:
 *   DB value:   "2025-09-24T18:00:00.000Z" (UTC)
 *   Local user: "2025-09-24T20:00" (if user is UTC+2)
 *
 * @param {string} iso - UTC ISO timestamp from DB
 * @returns {string} - Local time string in "YYYY-MM-DDTHH:mm" format
 */
// Convert DB UTC -> input local
export const toInputDate = (iso) => {
  if (!iso) return "";
  const date = new Date(iso); // Parse DB UTC date
  const tzOffset = date.getTimezoneOffset() * 60000; // Local timezone offset in ms

  // Adjust by subtracting offset → local time
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

/**
 * Convert a local datetime string (from input) → UTC ISO string (for DB).
 *
 * Example:
 *   Input value: "2025-09-24T20:00" (local user input, UTC+2)
 *   DB value:    "2025-09-24T18:00:00.000Z" (UTC)
 *
 * @param {string} input - Local datetime string (from <input>)
 * @returns {string|null} - UTC ISO string for DB, or null if invalid
 */
// Convert input local -> DB UTC
export const fromInputDate = (input) => {
  if (!input) return null;

  // `new Date(input)` interprets the string as local time
  return new Date(input).toISOString();
};
