/**
 * normalizeEvent.js
 * -----------------
 * Utility function to normalize raw event data from the backend.
 * Ensures that category IDs are consistent, maps category names,
 * and resolves the event creator from a list of users.
 *
 * @param {Object} event - The raw event object from the backend
 * @param {Array} allCategories - Array of all category objects { id, name }
 * @param {Array} allUsers - Optional array of all user objects { id, name, image }
 * @returns {Object|null} Normalized event with added fields for easier use in the frontend
 */
export const normalizeEvent = (event, allCategories, allUsers = []) => {
  // If no event is provided, return null
  if (!event) return null;

  // Convert category IDs to strings for consistency (used for comparisons)
  const categorysIds = event.categoryIds?.map(String) || [];

  // Map category IDs to their corresponding category names
  const eventCategories = allCategories.length
    ? categorysIds.map(
        (id) => allCategories.find((c) => String(c.id) === id)?.name
      )
    : [];

  // Resolve the creator object:
  // 1. Try to find in allUsers by createdBy
  // 2. Fallback to existing event.creator if available
  // 3. Otherwise null
  const creator =
    allUsers.find((u) => u.id === event.createdBy) || event.creator || null;

  // Return a normalized event object including:
  // - categorysIds: array of string IDs
  // - eventCategories: array of category names
  // - creator: resolved user object or null
  return { ...event, categorysIds, eventCategories, creator };
};
