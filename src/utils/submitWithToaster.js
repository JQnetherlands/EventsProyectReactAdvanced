/**
 * submitWithToaster.js
 * --------------------
 * Utility function to wrap async operations with toast notifications.
 * Shows loading, success, and error messages automatically using the toaster component.
 */
import { toaster } from "../components/UI/toaster";
import { DomainError } from "./domainError";

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
  } = message;


    // Ensure the input is a function
    if (typeof promiseFactory !== "function") {
      throw new DomainError(
        "INVALID_PROMISE_FACTORY",
        "promiseFactory must be a function that returns a Promise"
      );
    }

  const promise = Promise.resolve()
    .then(() => promiseFactory())
    .catch((err) => {
      if (err instanceof DomainError) {
        throw err
      }

      throw new DomainError(
        "UNKNOWN_ERROR",
        err?.message || String(err)
      );
    })


    // Attach the toaster notifications to the promise lifecycle
    toaster.promise(promise, {
      loading,
      success,
      error: (err) => ({
        title: "Error",
        description: err.message,
      })
    });

    // Await and return the original promise result
    return await promise;
  
}
