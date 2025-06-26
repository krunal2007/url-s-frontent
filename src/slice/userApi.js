import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiPath = "https://url-s-backend-ecru.vercel.app";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiPath}/auth/login`, data);
      return res.data;
    } catch (ex) {
      console.log(ex);
      return rejectWithValue(ex.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiPath}/auth/register`, data);
      return res.data;
    } catch (ex) {
      return rejectWithValue(ex.response.data);
    }
  }
);
