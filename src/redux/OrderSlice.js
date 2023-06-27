import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUrl, PostUrl } from "../BaseUrl";

export const handleGetOrders = createAsyncThunk(
  "orders/handleGetOrders",
  async ({ token }) => {
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

export const handleGetOrderbyId = createAsyncThunk(
  "orders/handleGetOrderbyId",
  async ({ token, id }) => {
    const response = await GetUrl(`order/${id}`, {
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
  async ({
    token,
    signal,
    shippingMethod,
    shippingAddress,
    paymentMethod,
    additionalNotes,
  }) => {
    signal.current = new AbortController();

    const response = await PostUrl(`order`, {
      data: {
        shippingAddress,
        shippingMethod,
        paymentMethod,
        additionalNotes,
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
  async ({
    token,
    signal,
    nameOnCard,
    cardNumber,
    expiry,
    cvv,
    country,
    postalCode,
    street,
    state,
    city,
  }) => {
    signal.current = new AbortController();

    const response = await PostUrl(`card`, {
      data: {
        nameOnCard,
        cardNumber,
        expiry,
        cvv,
        country,
        postalCode,
        street,
        state,
        city,
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
  cardDetails: null,
  shipphingMethod: "pickup",
  shippingAddressId: "",
  paymentOption: "cardPayment",
  singleOrder: null,
  orderId: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    handleChangeShippingMethod: (state, { payload }) => {
      state.shipphingMethod = payload;
    },
    handleChangeShippingAddressId: (state, { payload }) => {
      state.shippingAddressId = payload;
    },
    handleChangePaymentOption: (state, { payload }) => {
      state.paymentOption = payload;
    },
    handleChangeOrderId: (state, { payload }) => {
      state.orderId = payload;
      window.localStorage.setItem("orderId", JSON.stringify(payload));
    },
  },
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
      state.cardDetails = null;
    });
    // get order by id
    builder.addCase(handleGetOrderbyId.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.singleOrder = null;
    });
    builder.addCase(handleGetOrderbyId.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
        state.singleOrder = null;
      } else {
        state.error = null;
        state.success = true;
        state.singleOrder = payload?.order;
      }
    });
    builder.addCase(handleGetOrderbyId.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.cardDetails = null;
    });
    // get users card details
    builder.addCase(handleGetCard.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.cardDetails = null;
    });
    builder.addCase(handleGetCard.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
        state.cardDetails = null;
      } else {
        state.error = null;
        state.success = true;
        state.cardDetails = payload?.card;
      }
    });
    builder.addCase(handleGetCard.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.cardDetails = null;
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
        state.orderId = payload?.order?.orderId;
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

export const {
  handleChangeShippingMethod,
  handleChangePaymentOption,
  handleChangeShippingAddressId,
  handleChangeOrderId,
} = OrderSlice.actions;

export default OrderSlice.reducer;
