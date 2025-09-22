  // Convert DB UTC -> input local
  export const toInputDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in ms
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  // Convert input local -> DB UTC
  export const fromInputDate = (input) => {
    if (!input) return null;
    return new Date(input).toISOString();
  };