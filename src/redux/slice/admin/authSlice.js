import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

const URL_API = UrlApi();

const initialState = {
  isLoadingLoginAdmin: false,
  isSuccessLoginAdmin: null,
  isErrorLoginAdmin: null,
  dataAdmin: null,
  isAuthAdmin: null,
  isLogoutAdmin: null,
  isSuccessProfileAdmin: null,
  isLoadingProfileAdmin: null,
  isErrorProfileAdmin: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `auth/loginAdmin`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileAdmin = createAsyncThunk(
  "auth/profileAdmin",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("jwt_admin");
      if (!token) {
        token = "";
      }
      const res = await axios.get(URL_API + `auth/profileAdmin`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  try {
    const res = await axios.get(URL_API + `auth/logoutAdmin`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const authSilce = createSlice({
  name: "admin/auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.isLogout = action.payload;
      state.isAuth = null;
      state.isSuccessLogin = null;
      state.dataAdmin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state, action) => {
        state.isLoadingLoginAdmin = true;
        state.isSuccessLoginAdmin= null;
        state.isErrorLoginAdmin = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isSuccessLoginAdmin = action.payload;
        state.isLoadingLoginAdmin = false;
        state.isErrorLoginAdmin = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isErrorLoginAdmin = action.payload;
        state.isLoadingLoginAdmin = false;
        state.isSuccessLoginAdmin = null;
      })

      .addCase(profileAdmin.pending, (state, action) => {
        state.isLoadingProfileAdmin = true;
        state.isErrorProfileAdmin = null;
        state.isSuccessProfileAdmin = null;
      })
      .addCase(profileAdmin.fulfilled, (state, action) => {
        state.isSuccessProfileAdmin = action.payload;
        state.isLoadingProfileAdmin = false;
        state.isErrorProfileAdmin = null;
      })

      .addCase(profileAdmin.rejected, (state, action) => {
        state.isErrorProfileAdmin = action.payload;
        state.isLoadingProfileAdmin = false;
        state.isSuccessProfileAdmin = null;
      })

      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.isLogout = action.payload;
        state.isAuth = null;
        state.isSuccessLogin = null;
        state.dataAdmin = null;
      });
  },
});

export const { logout } = authSilce.actions;

export default authSilce.reducer;
