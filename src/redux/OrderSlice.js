import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUrl, PostUrl } from "../BaseUrl";
import { toast } from "react-hot-toast";

export const handleGetOrders = createAsyncThunk(
  "orders/handleGetOrders",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl(`order`, {
      headers: { Authorization: token },
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

export const handleGetCard = createAsyncThunk(
  "orders/handleGetCard",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl(`card`, {
      headers: { Authorization: token },
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

export const handleCreateOrder = createAsyncThunk(
  "orders/handleCreateOrder",
  async ({ token, signal, shippingMethod, shippingAddress, paymentMethod }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl(`order`, {
      data: {
        shippingAddress,
        shippingMethod,
        paymentMethod,
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

export const handleCreateOrUpdateCard = createAsyncThunk(
  "orders/handleCreateOrUpdateCard",
  async ({ token, signal, nameOnCard, cardNumber, expiry, cvv }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl(`card`, {
      data: {
        nameOnCard,
        cardNumber,
        expiry,
        cvv,
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

const initialState = {
  loading: false,
  success: false,
  error: null,
  orders: [],
  CardDetials: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get users orders
    builder.addCase(handleGetOrders.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.orders = [];
    });
    builder.addCase(handleGetOrders.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
        state.orders = [];
      } else {
        state.error = null;
        state.success = true;
        state.orders = payload?.orders;
      }
    });
    builder.addCase(handleGetOrders.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.CardDetials = null;
    });
    // get users card details
    builder.addCase(handleGetCard.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.CardDetials = null;
    });
    builder.addCase(handleGetCard.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
        state.CardDetials = null;
      } else {
        state.error = null;
        state.success = true;
        state.CardDetials = payload;
      }
    });
    builder.addCase(handleGetCard.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.CardDetials = null;
    });
    // create order
    builder.addCase(handleCreateOrder.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleCreateOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
      } else {
        state.error = null;
        state.success = true;
      }
    });
    builder.addCase(handleCreateOrder.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    // edit & update order
    builder.addCase(handleCreateOrUpdateCard.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      handleCreateOrUpdateCard.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        if (payload.status === "fail") {
          state.error = payload;
          state.success = false;
        } else {
          state.error = null;
          state.success = true;
        }
      }
    );
    builder.addCase(handleCreateOrUpdateCard.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
  },
});

export const {} = OrderSlice.actions;

export default OrderSlice.reducer;
