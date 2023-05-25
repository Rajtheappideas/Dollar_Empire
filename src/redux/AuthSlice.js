import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { PostUrl } from "../BaseUrl";
import i18next from "i18next";

export const handleLoginUser = createAsyncThunk(
  "auth/handleLoginUser",
  async ({ password, email, signal }) => {
    toast.dismiss();
    signal.current = new AbortController();
    const response = await PostUrl("login", {
      data: {
        email: email,
        password: password,
      },
      signal: signal.current.signal,
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
    location,
    city,
    state,
    country,
    postalCode,
    signal,
  }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl("register", {
      data: {
        fname,
        lname,
        email,
        password,
        phone,
        companyName,
        location,
        city,
        state,
        country,
        postalCode,
      },
      signal: signal.current.signal,
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
  userLanguage: window.localStorage.getItem("user_lang")
    ? JSON.parse(window.localStorage.getItem("user_lang"))
    : window.localStorage.setItem("user_lang", JSON.stringify("en")),
  loading: false,
  error: null,
  success: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogoutReducer: (state) => {
      toast.dismiss();
      state.user = null;
      window.localStorage.clear();
      window.location.href = window.location.origin;
      toast.success("Logout Successfully.", { duration: 3000 });
    },
    handleChangeUserLanguage: (state, { payload }) => {
      state.userLanguage = i18next.changeLanguage(payload);
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

export const { handleLogoutReducer, handleChangeUserLanguage } =
  AuthSlice.actions;

export default AuthSlice.reducer;
