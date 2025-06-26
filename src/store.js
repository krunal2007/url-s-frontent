import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import urlReducer from "./slice/urlSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer,
  },
});
