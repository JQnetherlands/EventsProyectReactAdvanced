export const filterEvents = (events, searchQuery = "", selectedCategories = []) => {
    if (!Array.isArray(events)) return [];
    
   return events.filter((event) => {
        const matchesSearch = event.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
    
        const matchesCategory =
          selectedCategories.length === 0 ||
          event.categoryIds.some((id) => selectedCategories.includes(Number(id)));
        return matchesSearch && matchesCategory
      });

}