const initialState = {
  news: [],
  loading: true,
  error: null,
};

export default function news(state = initialState, action) {
  switch (action.type) {
    case "news/load/fulfilled":
      return { ...state, news: action.payload, loading: false };

    case "news/load/rejected":
      return { ...state, news: [], error: action.error, loading: false };

    case "news/load/pending":
      return { ...state, loading: true };

    default:
      return state;
  }
}

export const loadNews = () => {
  return async (dispatch) => {
    dispatch({ type: "news/load/pending" });
    try {
      const response = await fetch("http://localhost:4000/news");
      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "news/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "news/load/fulfilled", payload: json });
      }
    } catch (err) {
      dispatch({ type: "news/load/rejected", error: err.message });
    }
  };
};
