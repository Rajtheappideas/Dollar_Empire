import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { PostUrl } from "../BaseUrl";

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ password, email }) => {
    toast.dismiss();
    const response = await PostUrl("login", {
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        window.localStorage.setItem("token", JSON.stringify(res.data.token));
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleRegisterUser = createAsyncThunk(
  "auth/handleRegisterUser",
  async ({
    fname,
    lname,
    email,
    password,
    phone,
    companyName,
    address,
    city,
    state,
    country,
    postalCode,
  }) => {
    toast.dismiss();
    const response = await PostUrl("register", {
      data: {
        fname,
        lname,
        email,
        password,
        phone,
        companyName,
        address,
        city,
        state,
        country,
        postalCode,
      },
    })
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        window.localStorage.setItem("token", JSON.stringify(res.data.token));
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

const initialState = {
  user: window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : null,
  token: window.localStorage.getItem("token")
    ? JSON.parse(window.localStorage.getItem("token"))
    : null,
  loading: false,
  error: null,
  success: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.user = null;
      window.localStorage.clear();
      window.location.replace(window.location.origin);
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(handleLoginUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleLoginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.user = null;
        state.token = null;
      } else {
        state.error = null;
        state.user = payload?.user;
        state.token = payload?.token;
      }
    });
    builder.addCase(handleLoginUser.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.user = null;
      state.token = null;
    });
    // register
    builder.addCase(handleRegisterUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleRegisterUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.user = null;
        state.token = null;
      } else {
        state.error = null;
        state.user = payload?.user;
        state.token = payload?.token;
      }
    });
    builder.addCase(handleRegisterUser.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.user = null;
      state.token = null;
    });
  },
});

export const { handleLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
