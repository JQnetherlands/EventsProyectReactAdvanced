/**
 * submitWithToaster.js
 * --------------------
 * Utility function to wrap async operations with toast notifications.
 * Shows loading, success, and error messages automatically using the toaster component.
 */
import { toaster } from "../components/UI/toaster";
import { showToast } from "./showToast";

/**
 * Wraps a promise-returning function with toaster notifications.
 *
 * @param {Function} promiseFactory - Function that returns a Promise
 * @param {Object} message - Optional messages for loading, success, and error states
 * @returns {Promise} - Resolves/rejects with the original promise
 */
export async function submitWithToaster(promiseFactory, message = {}) {
  // Default messages for different states
  const {
    loading = { title: "Working...", description: "" },
    success = { title: "Done", description: "" },
    error = { title: "Failed", description: "" },
  } = message;

  try {
    // Ensure the input is a function
    if (typeof promiseFactory !== "function") {
      throw new Error(
        "promiseFactory must be a function that returns a Promise"
      );
    }

    const promise = promiseFactory();

    // Ensure the function returns a Promise
    if (!promise || typeof promise.then !== "function") {
      throw new Error("promiseFactory must return a Promise");
    }

    // Attach the toaster notifications to the promise lifecycle
    toaster.promise(promise, {
      loading,
      success,
      error,
    });

    // Await and return the original promise result
    return await promise;
  } catch (err) {
    // Show a standard error toast if the promise fails
    showToast.error(err);
    throw err; // Re-throw to allow further error handling
  }
}
