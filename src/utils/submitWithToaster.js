import { toaster } from "../components/UI/toaster"
import { showToast } from "./showToast";

export async function submitWithToaster(promiseFactory, message= {}) {
  const { 
    loading = { title: "Working...", description: "" },
    success = { title: "Done", description: "" },
    error = { title: "Failed", description: "" },
  } = message;
  
  try {
    if (typeof promiseFactory !== "function") {
      throw new Error("promiseFactory must be a function that returns a Promise");
    }

    const promise = promiseFactory();

    if (!promise || typeof promise.then !== "function") {
      throw new Error("promiseFactory must return a Promise")
    }

    toaster.promise(promise, {
      loading,
      success,
      error,
    });

    return await promise
  } catch (err) {
    
    showToast.error(err);
    throw err
  }
}