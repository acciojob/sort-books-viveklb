
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks, setSortBy, setSortOrder } from "../store/actions";
import { selectSortedBooks } from "../store/selectors";

const App = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectSortedBooks);
  const { loading, error, sortBy, sortOrder } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      <h1>Books</h1>
      <label>
        Sort by{" "}
        <select
          value={sortBy}
          onChange={(event) => dispatch(setSortBy(event.target.value))}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
      </label>{" "}
      <label>
        Order{" "}
        <select
          value={sortOrder}
          onChange={(event) => dispatch(setSortOrder(event.target.value))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      {loading && <p role="status">Loading books...</p>}
      {error && (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => dispatch(fetchBooks())}>
            Retry
          </button>
        </div>
      )}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publisher</th>
              <th scope="col">ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn || `${book.title}-${book.author}`}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="4">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;

export default App
