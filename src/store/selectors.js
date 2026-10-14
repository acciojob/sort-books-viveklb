export const selectSortedBooks = (state) => {
  const direction = state.sortOrder === "desc" ? -1 : 1;
  return state.books.slice().sort((firstBook, secondBook) => {
    const firstValue = (firstBook[state.sortBy] || "").toLocaleLowerCase();
    const secondValue = (secondBook[state.sortBy] || "").toLocaleLowerCase();
    return direction * firstValue.localeCompare(secondValue);
  });
};