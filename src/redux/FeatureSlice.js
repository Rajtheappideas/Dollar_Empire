import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { GetUrl, PostUrl } from "../BaseUrl";

export const handlePostNewAddress = createAsyncThunk(
  "features/handlePostNewAddress",
  async ({
    fname,
    lname,
    companyName,
    state,
    city,
    country,
    postalCode,
    location,
    signal,
    phone,
    token,
  }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl("address", {
      data: {
        fname,
        lname,
        companyName,
        location,
        city,
        state,
        country,
        postalCode,
        phone,
      },
      signal: signal.current.signal,
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

export const handlePostEditAddress = createAsyncThunk(
  "features/handlePostEditAddress",
  async ({
    fname,
    lname,
    companyName,
    state,
    city,
    country,
    postalCode,
    location,
    signal,
    phone,
    token,
    id,
    rejectWithValue,
  }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl(`address/${id}`, {
      data: {
        fname,
        lname,
        companyName,
        location,
        city,
        state,
        country,
        postalCode,
        phone,
      },
      signal: signal.current.signal,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data);
      });
    return response;
  }
);

export const handlePostDeleteAddress = createAsyncThunk(
  "features/handlePostDeleteAddress",
  async ({ signal, token, id }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await GetUrl(`/address/delete/${id}`, {
      signal: signal.current.signal,
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

export const handleAddProductToFavourites = createAsyncThunk(
  "features/handleAddProductToFavourites",
  async ({ signal, token, id }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await GetUrl(`/favourite/add/${id}`, {
      signal: signal.current.signal,
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

export const handleRemoveProductToFavourites = createAsyncThunk(
  "features/handleRemoveProductToFavourites",
  async ({ signal, token, id }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await GetUrl(`/favourite/remove/${id}`, {
      signal: signal.current.signal,
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
};

const FeatureSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add new address
    builder.addCase(handlePostNewAddress.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handlePostNewAddress.fulfilled, (state, {}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(handlePostNewAddress.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    //  edit address
    builder.addCase(handlePostEditAddress.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handlePostEditAddress.fulfilled, (state, {}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(handlePostEditAddress.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    // delete address
    builder.addCase(handlePostDeleteAddress.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handlePostDeleteAddress.fulfilled, (state, {}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(handlePostDeleteAddress.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    // add favourties
    builder.addCase(handleAddProductToFavourites.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleAddProductToFavourites.fulfilled, (state, {}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(
      handleAddProductToFavourites.rejected,
      (state, { error }) => {
        state.loading = false;
        state.success = false;
        state.error = error;
      }
    );
    // remove favourties
    builder.addCase(handleRemoveProductToFavourites.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleRemoveProductToFavourites.fulfilled, (state, {}) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(
      handleRemoveProductToFavourites.rejected,
      (state, { error }) => {
        state.loading = false;
        state.success = false;
        state.error = error;
      }
    );
  },
});

export const {} = FeatureSlice.actions;

export default FeatureSlice.reducer;
