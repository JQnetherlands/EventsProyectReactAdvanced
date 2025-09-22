import { toaster } from "../components/UI/toaster"

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
    
    toaster.create({
      title: err.title || "Error",
      description: err.message || String(err),
      type: "error",
      closable: true,
    })
    throw err
  }
}