const initialState = {
  comments: [],
  error: null,
  loading: true,
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case "comments/load/fulfilled":
      return { ...state, comments: action.payload, loading: false };

    case "comments/load/rejected":
      return { ...state, comments: [], loading: false, error: action.error };

    case "comments/load/pending":
      return { ...state, loading: true };

    case "comments/add/fulfilled":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
      };

    case "comments/add/rejected":
      return { ...state, error: action.error, loading: false };

    case "comments/add/pending":
      return { ...state, loading: true };

    case "comments/delete/fulfilled":
      return {
        ...state,
        comments: state.comments.filter((item) => item._id !== action.payload),
        loading: false,
      };

    case "comments/delete/rejected":
      return { ...state, error: action.error, loading: false };

    case "comments/delete/pending":
      return { ...state, loading: true };

    default:
      return state;
  }
}

export const loadComments = () => {
  return async (dispatch) => {
    dispatch({ type: "comments/load/pending" });
    try {
      const comments = await fetch(`http://localhost:4000/comments`);
      const json = await comments.json();

      if (json.error) {
        dispatch({
          type: "comments/load/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "comments/load/fulfilled", payload: json });
      }
    } catch (err) {
      dispatch({
        type: "comments/load/rejected",
        error: err.message,
      });
    }
  };
};

export const addComment = (text, news, user, author) => {
  return async (dispatch, getState) => {
    dispatch({ type: "comments/add/pending" });
    try {
      const state = getState();
      const comment = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.application.token}`,
        },
        body: JSON.stringify({ text, news, user, author }),
      });

      const json = await comment.json();

      if (json.error) {
        dispatch({
          type: "comments/add/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "comments/add/fulfilled", payload: json });
      }
    } catch (err) {
      dispatch({ type: "comments/add/rejected", error: err.message });
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: "comments/delete/pending" });
    try {
      const state = getState();
      const comment = await fetch(`http://localhost:4000/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${state.application.token}` },
      });

      const json = await comment.json();

      if (json.error) {
        dispatch({
          type: "comments/delete/rejected",
          error: json.error,
        });
      } else {
        dispatch({ type: "comments/delete/fulfilled", payload: id });
      }
    } catch (err) {
      dispatch({ type: "comments/delete/rejected", error: err.message });
    }
  };
};
