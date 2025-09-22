export const normalizeEvent = (event, allCategories, allUsers = []) => {
    // Convert category IDs to numbers for backend API
  if (!event) return null

  // normalizeEvent
  const categorysIds = event.categoryIds?.map(String) || [];
  const eventCategories = allCategories.length ? categorysIds.map(
    (id) => allCategories.find((c) => String(c.id) === id)?.name
  ) : [];

  //Normalize creator
  const creator = allUsers.find((u) => u.id === event.createdBy) || event.creator || null;

  return { ...event, categorysIds, eventCategories, creator };
};

