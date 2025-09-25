/**
 * filterEvents.js
 * ----------------
 * Utility function to filter an array of events based on:
 *   1. A search query string
 *   2. Selected category IDs
 *
 * This is typically used for filtering events in the UI based on
 * user input in a search bar and category checkboxes.
 */

/**
 * Filters events by title and category.
 *
 * @param {Array} events - Array of event objects. Each event should have:
 *   - title {string}: Event title
 *   - categoryIds {Array<number|string>}: IDs of categories associated with the event
 * @param {string} searchQuery - Search string to match against event titles (case-insensitive)
 * @param {Array<number>} selectedCategories - Array of selected category IDs
 * @returns {Array} - Filtered array of events
 */
export const filterEvents = (
  events,
  searchQuery = "",
  selectedCategories = []
) => {
  // If events is not an array, return empty array to avoid runtime errors
  if (!Array.isArray(events)) return [];

  return events.filter((event) => {
    // Check if the event title matches the search query (case-insensitive)
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if the event belongs to at least one of the selected categories
    // If no categories are selected, all events pass this filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      event.categoryIds.some((id) => selectedCategories.includes(Number(id)));

    // Event must satisfy both search and category filters
    return matchesSearch && matchesCategory;
  });
};
