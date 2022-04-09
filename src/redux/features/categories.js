const initialState = {
  categories: [],
  loading: true,
  error: null,
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case "categories/load/fulfilled":
      return { ...state, categories: action.payload, loading: false };

    case "categories/load/rejected":
      return {
        ...state,
        categories: [],
        error: "Произошла ошибка при запросе",
        loading: false,
      };

    case "categories/load/pending":
      return { ...state, loading: true };

    default:
      return state;
  }
}

export const loadCategories = () => {
  return async (dispatch) => {
    dispatch({ type: "categories/load/pending" });
    try {
      const response = await fetch("http://localhost:4000/categories");
      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "categories/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "categories/load/fulfilled", payload: json });
      }
    } catch (err) {
      dispatch({ type: "categories/load/rejected", error: err.message });
    }
  };
};
