import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { GetUrl } from "../BaseUrl";

export const handleGetAddresses = createAsyncThunk(
  "getContent/handleGetAddresses",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl("address", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetUserProfile = createAsyncThunk(
  "getContent/handleGetUserProfile",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl("profile", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  addressList: [],
  user: null,
};

const GetContentSlice = createSlice({
  name: "getContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get adderss list
    builder.addCase(handleGetAddresses.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleGetAddresses.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.addressList = [];
      } else {
        state.error = null;
        state.addressList = payload?.addresses;
      }
    });
    builder.addCase(handleGetAddresses.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    // get user profile
    builder.addCase(handleGetUserProfile.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleGetUserProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.user = null;
      } else {
        state.error = null;
        state.user = payload?.user;
      }
    });
    builder.addCase(handleGetUserProfile.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
  },
});

export const {} = GetContentSlice.actions;

export default GetContentSlice.reducer;
