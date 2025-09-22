import { messages } from "./messages";

export function validateEvent({
  title,
  description,
  startTime,
  endTime,
  categories,
  location
}) {
  const v = messages.validation;

  if (!title.trim()) return { field: "title", message: v.title };
  if (!description || !description.trim())
    return { field: "description", message: v.description };
  if (!location?.trim())
    return { field: "location", message: v.location };

  if (!startTime)
    return { field: "startTime", message: v.startTime.required };
  if (!endTime) return { field: "endTime", message: v.endTime.required };
  if (!Array.isArray(categories) || categories.length === 0)
    return {
      field: "categories",
      message: v.categories,
    };

//   const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

//   if (start < now)
//     return { field: "startTime", message: "Start time must be in the future" };
  if (start > end)
    return {
      field: "startTime",
      message: v.startTime.invalidOrder,
    };
//   if (end < now)
//     return {
//       field: "endTime",
//       message: "end time must be in the future",
//     };
  return null;
}
