/**
 * api/events.js
 * -------------------
 * Centralized API client for the app.
 *
 * - Defines a common `handleRes` function to standardize response parsing & error handling.
 * - Exports CRUD functions for `events`, plus read functions for `categories` and `users`.
 * - Uses the Fetch API to make HTTP requests to the backend (default: http://localhost:3000).
 */

const BASE = "http://localhost:3000";

/**
 * Handle API responses consistently.
 *
 * - Reads the response body as text (so we can parse JSON or return plain text).
 * - Attempts to parse JSON (gracefully falls back to raw text if not JSON).
 * - Throws a custom `Error` with `status` and `data` attached if response not OK.
 * - Returns parsed data otherwise.
 */
async function handleRes(res) {
  const text = await res.text();
  let data;
  try {
    // Try parsing JSON (most responses)
    data = text ? JSON.parse(text) : null;
  } catch {
    // Fallback: plain text response
    data = text;
  }

    if (!res.ok) {
      // Construct a helpful error object
      const err = new Error(data?.message || res.statusText || "API error");
      err.status = res.status;
      err.data = data;
      throw err; // Caller must handle this
    }
  return data;
}

/**
 * Fetch all events.
 * GET /events
 */
export async function fetchEvents() {
  const res = await fetch(`${BASE}/events`);
  return handleRes(res);
}

/**
 * Fetch a single event by ID.
 * GET /events/:id
 */
export async function fetchEvent(id) {
  const res = await fetch(`${BASE}/events/${id}`);
  return handleRes(res);
}

/**
 * Fetch all categories.
 * GET /categories
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  return handleRes(res);
}

/**
 * Fetch all users.
 * GET /users
 */
export async function fetchUsers() {
  const res = await fetch(`${BASE}/users`);
  return handleRes(res);
}

/**
 * Create a new event.
 * POST /events
 * @param {Object} event - Event payload
 */
export async function createEvent(event) {
  const res = await fetch(`${BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  return handleRes(res);
}

/**
 * Update an existing event.
 * PUT /events/:id
 * @param {number|string} id - Event ID
 * @param {Object} event - Partial/complete event payload
 */
export async function updateEvent(id, event) {
  const res = await fetch(`${BASE}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  return handleRes(res);
}

/**
 * Delete an event.
 * DELETE /events/:id
 * @param {number|string} id - Event ID
 */
export async function deleteEvent(id) {
  const res = await fetch(`${BASE}/events/${id}`, {
    method: "DELETE",
  });
  return handleRes(res);
}
