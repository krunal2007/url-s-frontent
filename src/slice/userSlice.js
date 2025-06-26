import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userApi";
import { toast } from "react-toastify";

export const decode_jwt = (token) => {
  const base64Url = token.split(".")[1];
  const jsonStr = atob(base64Url);
  return JSON.parse(jsonStr);
};

const getUser = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const user = decode_jwt(token);
  return user;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUser(),
    loading: false,
    error: "",
    isRegistered: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("accessToken", action.payload.accessToken);
      toast(action.payload.message, { type: "success", theme: "colored" });
      window.location.href = "/dashboard";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      toast(action.payload.message, { type: "error", theme: "colored" });
    });

    // sign up api data
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isRegistered = true;
      toast("User registered successfully.", {
        type: "success",
        theme: "colored",
      });
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.isRegistered = false;
      toast(action.payload.message, { type: "error", theme: "colored" });
    });
  },
});

export default userSlice.reducer;
