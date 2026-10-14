export const BOOKS_REQUEST = "BOOKS_REQUEST";
export const BOOKS_SUCCESS = "BOOKS_SUCCESS";
export const BOOKS_FAILURE = "BOOKS_FAILURE";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const setSortBy = (sortBy) => ({ type: SET_SORT_BY, sortBy });
export const setSortOrder = (sortOrder) => ({ type: SET_SORT_ORDER, sortOrder });

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: BOOKS_REQUEST });

  try {
    const apiKey =
      process.env.NYT_API_KEY ||
      (typeof window !== "undefined" && window.NYT_BOOKS_API_KEY) ||
      "";
    const url =
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" +
      encodeURIComponent(apiKey);
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok === false || data.status === "ERROR") {
      const apiError =
        (data.fault && data.fault.faultstring) ||
        (data.errors && data.errors[0] && data.errors[0].message) ||
        data.message;
      throw new Error(apiError || "The Books API request failed.");
    }

    const results = data.results || {};
    const rawBooks = Array.isArray(results.books)
      ? results.books
      : Array.isArray(results)
        ? results
        : [];
    const books = rawBooks.map((book) => {
      const details =
        (Array.isArray(book.book_details) && book.book_details[0]) || book;

      return {
        title: book.title || details.title || "",
        author: book.author || details.author || "",
        publisher: book.publisher || details.publisher || "",
        isbn:
          book.primary_isbn10 ||
          book.primary_isbn13 ||
          details.primary_isbn10 ||
          details.primary_isbn13 ||
          "",
      };
    });

    dispatch({ type: BOOKS_SUCCESS, books });
  } catch (error) {
    dispatch({
      type: BOOKS_FAILURE,
      error: error.message || "Unable to load books.",
    });
  }
};