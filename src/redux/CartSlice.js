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
  multipleLoading: false,
  success: false,
  error: null,
  cart: null,
  subTotal: 0,
  grandTotal: 0,
  totalQuantity: 0,
  cartItems: [],
  selectedItems: [],
  totalQuantityMultipleProducts: 0,
  totalAmountMultipleProducts: 0,
  // totalQuantity: window.localStorage.getItem("persist:cart")
  //   ? JSON.parse(window.localStorage.getItem("persist:cart")).totalQuantity
  //   : 0,
  totalQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state.cartItems.reduce((acc, current) => {
        if (current?.type === "pk") {
          return acc + current?.quantity * current?.product?.PK;
        } else {
          return acc + current?.quantity * current?.product?.CTN;
        }
      }, 0);
    },

    calculateTotalAmount: (state) => {
      state.grandTotal = state.cartItems.reduce((acc, curr) => {
        if (curr?.type === "pk") {
          let total =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.PK;
          return total;
        } else {
          let total =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.CTN;
          return total;
        }
      }, 0);
    },

    changeGrandTotal: (state, { payload }) => {
      const total = state.cartItems.reduce((acc, curr) => {
        if (curr?.type === "pk") {
          let pkTotal =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.PK;
          return pkTotal;
        } else {
          let ctnTotal =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.CTN;
          return ctnTotal;
        }
      }, 0);
      if (payload === "freight") {
        state.grandTotal = total + 10;
      } else {
        state.grandTotal = total;
      }
    },

    handleChangeAddProduct: (state, { payload }) => {
      if (state.totalQuantity === 0 && state.grandTotal === 0) {
        state.totalQuantity = payload?.quantity;
        state.grandTotal = payload?.amount;
      } else {
        state.totalQuantity =
          parseFloat(state.totalQuantity) + parseFloat(payload?.quantity);
        state.grandTotal =
          parseFloat(state.grandTotal) + parseFloat(payload?.amount);
      }
    },

    handleUpdateTotalQuantityAndAmount: (state, { payload }) => {
      const { id, quantity } = payload;

      state.cartItems = state.cartItems.map((product) =>
        product?.product?._id === id
          ? { ...product, quantity: parseFloat(quantity) }
          : product
      );
      state.totalQuantity = state.totalQuantity = state.cartItems.reduce(
        (acc, current) => {
          if (current?.type === "pk") {
            return acc + current?.quantity * current?.product?.PK;
          } else {
            return acc + current?.quantity * current?.product?.CTN;
          }
        },
        0
      );
      state.grandTotal = state.cartItems.reduce((acc, curr) => {
        if (curr?.type === "pk") {
          let total =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.PK;
          return total;
        } else {
          let total =
            acc + curr?.product?.price * curr?.quantity * curr?.product?.CTN;
          return total;
        }
      }, 0);
    },

    handleDecreaseQuantityAndAmount: (state, { payload }) => {
      if (state.totalQuantity <= 0) {
        state.totalQuantity = 0;
        return true;
      } else if (state.grandTotal <= 0) {
        state.grandTotal = 0;
        return true;
      } else {
        state.totalQuantity =
          parseFloat(state.totalQuantity) - parseFloat(payload?.quantity);
        state.grandTotal = parseFloat(
          parseFloat(state.grandTotal) - parseFloat(payload?.amount)
        ).toFixed(2);
      }
    },

    handleClearCart: (state) => {
      state.totalQuantity = 0;
      state.grandTotal = 0;
      state.cartItems = [];
    },

    handleAddMultipleProducts: (state, { payload }) => {
      state.selectedItems = payload;
    },

    handleRemoveOneProductFromSelected: (state, { payload }) => {
      const filterArr = state.selectedItems.filter(
        (item) => item?.id !== payload
      );
      state.selectedItems = filterArr;
    },

    handleRemoveItemFromCart: (state, { payload }) => {
      const filterArr = state.cartItems.filter(
        (item) => item?.product?._id !== payload
      );
      state.cartItems = filterArr;
    },

    handleRemoveAllProducts: (state) => {
      state.selectedItems = [];
    },

    handlechangeTotalQuantityAndAmountOfmultipleProducts: (
      state,
      { payload }
    ) => {
      state.totalQuantityMultipleProducts = parseInt(payload?.totalQuantity);
      state.totalAmountMultipleProducts = parseInt(payload?.totalAmount);
    },

    handleRemoveFromTotalQuantityAndAmountOfmultipleProducts: (
      state,
      { payload }
    ) => {
      state.totalQuantityMultipleProducts =
        state.totalQuantityMultipleProducts - parseInt(payload?.quantity);
      state.totalAmountMultipleProducts =
        state.totalAmountMultipleProducts - parseInt(payload?.amount);
    },

    handleRemoveAllTotalQuantityAndTotalAmount: (state) => {
      state.totalAmountMultipleProducts = 0;
      state.totalQuantityMultipleProducts = 0;
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
      state.multipleLoading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      handleAddMultipleProductToCart.fulfilled,
      (state, { payload }) => {
        state.multipleLoading = false;
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
        state.multipleLoading = false;
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
  changeGrandTotal,
  handleClearCart,
  handleChangeAddProduct,
  handleAddMultipleProducts,
  handleRemoveAllProducts,
  handleRemoveOneProductFromSelected,
  handlechangeTotalQuantityAndAmountOfmultipleProducts,
  handleRemoveFromTotalQuantityAndAmountOfmultipleProducts,
  handleRemoveAllTotalQuantityAndTotalAmount,
  handleRemoveItemFromCart,
} = CartSlice.actions;

export default CartSlice.reducer;