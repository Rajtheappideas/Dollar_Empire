import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { GetUrl, PostUrl } from "../BaseUrl";

export const handleGetCart = createAsyncThunk(
  "cart/handleGetCart",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl(`cart`, { headers: { Authorization: token } })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleAddProductToCart = createAsyncThunk(
  "cart/handleAddProductToCart",
  async ({ id, token, type, quantity, signal }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl(`cart/${id}`, {
      data: {
        type,
        quantity,
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

export const handleAddMultipleProductToCart = createAsyncThunk(
  "cart/handleAddMultipleProductToCart",
  async ({ token, products, signal }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await PostUrl(`cart`, {
      data: {
        products,
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

export const handleRemoveProductToCart = createAsyncThunk(
  "cart/handleRemoveProductToCart",
  async ({ id, token, signal }) => {
    toast.dismiss();
    signal.current = new AbortController();

    const response = await GetUrl(`cart/remove/${id}`, {
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
  success: true,
  error: null,
  cart: null,
  subTotal: 0,
  grandTotal: 0,
  quantity: 0,
  orderType: "pk",
  totalQuantity: 0,
  cartItems: [],
  totalQuantity: window.localStorage.getItem("persist:cart")
    ? JSON.parse(window.localStorage.getItem("persist:cart")).totalQuantity
    : 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {},
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state.cartItems.reduce((acc, current) => {
        return acc + current?.quantity;
      }, 0);
    },
    calculateTotalAmount: (state) => {
      state.grandTotal = state.cartItems.reduce((acc, curr) => {
        let total = acc + curr?.product?.price * curr?.quantity;
        return total;
      }, 0);
    },
    handleUpdateTotalQuantityAndAmount: (state, { payload }) => {
      if (state.totalQuantity === 0) {
        state.totalQuantity = payload?.quantity;
      }
      if (state.grandTotal === 0) {
        state.grandTotal = payload?.amount;
      }
      state.totalQuantity =
        parseFloat(state.totalQuantity) + parseFloat(payload?.quantity);
      state.grandTotal =
        parseFloat(state.grandTotal) + parseFloat(payload?.amount);
    },
    handleDecreaseQuantityAndAmount: (state, { payload }) => {
      if (state.totalQuantity <= 0) {
        return (state.totalQuantity = 0);
      }
      state.totalQuantity =
        parseFloat(state.totalQuantity) - parseFloat(payload?.quantity);
      state.grandTotal = parseFloat(
        parseFloat(state.grandTotal) - parseFloat(payload?.amount)
      ).toFixed(2);
    },
  },
  extraReducers: (builder) => {
    // get users cart
    builder.addCase(handleGetCart.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.cart = null;
    });
    builder.addCase(handleGetCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.cart = null;
        state.success = false;
        state.cartItems = [];
      } else {
        state.error = null;
        state.success = true;
        state.cart = payload?.cart;
        state.cartItems = payload?.cart?.items;
      }
    });
    builder.addCase(handleGetCart.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.cart = null;
    });
    // handle add product to cart
    builder.addCase(handleAddProductToCart.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(handleAddProductToCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload.status === "fail") {
        state.error = payload;
        state.success = false;
      } else {
        state.error = null;
        state.success = true;
        state.cart = payload;
        state.cartItems = payload?.cart?.items;
      }
    });
    builder.addCase(handleAddProductToCart.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
    // handle add multiple product to cart
    builder.addCase(handleAddMultipleProductToCart.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      handleAddMultipleProductToCart.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        if (payload.status === "fail") {
          state.error = payload;
          state.success = false;
        } else {
          state.error = null;
          state.success = true;
          state.cart = payload?.cart;
          state.cartItems = payload?.cart?.items;
        }
      }
    );
    builder.addCase(
      handleAddMultipleProductToCart.rejected,
      (state, { error }) => {
        state.loading = false;
        state.success = false;
        state.error = error;
      }
    );
    // handle remove product to cart
    builder.addCase(handleRemoveProductToCart.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      handleRemoveProductToCart.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        if (payload.status === "fail") {
          state.error = payload;
          state.success = false;
        } else {
          state.success = true;
          state.error = null;
          state.cart = payload;
          state.cartItems = payload?.cart?.items;
        }
      }
    );
    builder.addCase(handleRemoveProductToCart.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
    });
  },
});

export const {
  handleUpdateTotalQuantityAndAmount,
  handleDecreaseQuantityAndAmount,
  calculateTotalQuantity,
  calculateTotalAmount,
} = CartSlice.actions;

export default CartSlice.reducer;
