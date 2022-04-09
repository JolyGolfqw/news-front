const initialState = {
  signingUp: false, // регистрация
  signingIn: false,
  errorSingUp: null,
  errorSingnIn: null,
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case "application/signup/pending":
      return { ...state, signingUp: true, errorSingUp: null };

    case "application/signup/fulfilled":
      return { ...state, signingUp: false };

    case "application/signup/rejected":
      return { ...state, signingUp: false, errorSingUp: action.error };

    case "application/signin/pending":
      return { ...state, signingIn: true, errorSingnIn: null };

    case "application/signin/fulfilled":
      return { ...state, signingIn: false, token: action.payload };

    case "application/signin/rejected":
      return { ...state, signingIn: false, errorSingnIn: action.error };
    default:
      return state;
  }
}

export const auth = (login, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "application/signin/pending" });
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();

      if (json.error) {
        dispatch({ type: "application/signin/rejected", error: json.error });
      } else {
        dispatch({ type: "application/signin/fulfilled", payload: json });

        localStorage.setItem("token", json.token);
        localStorage.setItem("user", json.id);
      }
    } catch (err) {
      dispatch({ type: "application/signin/rejected", error: err.message });
    }
  };
};

export const createUser = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();

      if (json.error) {
        dispatch({ type: "application/signup/rejected", error: json.error });
      } else {
        dispatch({ type: "application/signup/fulfilled", payload: json });
      }
    } catch (err) {
      dispatch({ type: "application/signup/rejected", error: err.message });
    }
  };
};
