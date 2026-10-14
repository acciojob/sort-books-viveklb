import {
  BOOKS_FAILURE,
  BOOKS_REQUEST,
  BOOKS_SUCCESS,
  SET_SORT_BY,
  SET_SORT_ORDER,
} from "./actions";

const initialState = {
  books: [],
  sortBy: "title",
  sortOrder: "asc",
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case BOOKS_SUCCESS:
      return { ...state, books: action.books, loading: false, error: null };
    case BOOKS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_SORT_BY:
      return { ...state, sortBy: action.sortBy };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.sortOrder };
    default:
      return state;
  }
}