import { DomainError } from "./domainError";

export const normalizeError = (err) => {
  // If it's already a DomainError , trust it
  if (err instanceof DomainError) {
    return err;
  }

  if (err instanceof Error) {
    return new DomainError(
      "UNEXPECTED_ERROR",
      err.message || "Unexpected error ocurred",
      { original: err },
    );
  }
  return new DomainError("UNKNOWN_ERROR", String(err) || "Unknown error", {
    original: err,
  });
};
