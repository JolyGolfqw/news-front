import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import categories from "./features/categories";
import news from "./features/news";
import comments from './features/comments'
import application from "./features/application";

export const store = createStore(combineReducers({
    categories,
    news,
    comments,
    application,
}), composeWithDevTools(applyMiddleware(thunk)))