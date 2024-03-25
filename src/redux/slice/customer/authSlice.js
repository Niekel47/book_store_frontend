import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const URL_API = UrlApi();

const initialState = {
  isLoadingRegister: false,
  isErrorRegister: null,
  isSuccessRegister: null,
  isLoadingLogin: false,
  isSuccessLogin: null,
  isErrorLogin: null,
  dataUser: null,
  isAuthSucess: null,
  isAuthError: null,
  isSuccessLogout: null,
  isLoadingProfile: null,
  isSuccessProfile: null,
  isErrorProfile: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (data_user, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `user/register`, data_user);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/loginUser",
  async (data_user, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `auth/login`, data_user, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("jwt");
      console.log("jwt", localStorage.getItem("jwt"));
      if (!token) {
        token = "";
      }
      const res = await axios.get(URL_API + `auth/profile`, {
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

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axios.get(URL_API + `/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const authSlice = createSlice({
  name: "customer/auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoadingRegister = true;
        state.isSuccessRegister = null;
        state.isErrorRegister = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccessRegister = action.payload;
        state.isLoadingRegister = false;
        state.isErrorRegister = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isErrorRegister = action.payload;
        state.isLoadingRegister = false;
        state.isSuccessRegister = null;
      })

      .addCase(login.pending, (state, action) => {
        state.isLoadingLogin = true;
        state.isSuccessLogin = null;
        state.isErrorLogin = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccessLogin = action.payload;
        state.isLoadingLogin = false;
        state.isErrorLogin = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isErrorLogin = action.payload;
        state.isLoadingLogin = false;
        state.isSuccessLogin = null;
      })
      //profile
      .addCase(profile.pending, (state, action) => {
        state.isLoadingProfile = true;
        state.isErrorProfile = null;
        state.isSuccessProfile = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isSuccessProfile = action.payload;
        state.isLoadingProfile = false;
        state.isErrorProfile = null;
      })

      .addCase(profile.rejected, (state, action) => {
        state.isErrorProfile = action.payload;
        state.isLoadingProfile = false;
        state.isSuccessProfile = null;
      })
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
