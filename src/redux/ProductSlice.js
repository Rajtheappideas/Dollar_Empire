import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUrl } from "../BaseUrl";
import { toast } from "react-hot-toast";

export const handleGetAllProducts = createAsyncThunk(
  "products/handleGetAllProducts",
  async ({ token }) => {
    toast.dismiss();
    if (token === null) {
      const response = await GetUrl("product", {})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return response;
    } else {
      const response = await GetUrl("product", {
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
  }
);

export const handleGetNewArrivals = createAsyncThunk(
  "products/handleGetNewArrivals",
  async ({ token }) => {
    toast.dismiss();
    if (token === null) {
      const response = await GetUrl("new-arrivals", {})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return response;
    } else {
      const response = await GetUrl("new-arrivals", {
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
  }
);

export const handleGetTopSellers = createAsyncThunk(
  "products/handleGetTopSellers",
  async ({ token }) => {
    toast.dismiss();
    if (token === null) {
      const response = await GetUrl("top-sellers", {})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return response;
    } else {
      const response = await GetUrl("top-sellers", {
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
  }
);

export const handleGetProductById = createAsyncThunk(
  "products/handleGetProductById",
  async ({ id, token }) => {
    toast.dismiss();
    if (token === null) {
      const response = await GetUrl(`product/${id}`, {})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return response;
    } else {
      const response = await GetUrl(`product/${id}`, {
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
  }
);
const initialState = {
  productLoading: false,
  singleProductLoading: false,
  success: false,
  error: null,
  allProducts: [],
  newArrivals: [],
  topSellers: [],
  minOrderAmount: null,
  singleProduct: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get new arrivals
    builder.addCase(handleGetNewArrivals.pending, (state) => {
      state.productLoading = true;
      state.success = false;
      state.error = null;
      state.newArrivals = [];
    });
    builder.addCase(handleGetNewArrivals.fulfilled, (state, { payload }) => {
      state.productLoading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.newArrivals = [];
      } else {
        state.error = null;
        state.newArrivals = payload?.products;
      }
    });
    builder.addCase(handleGetNewArrivals.rejected, (state, { error }) => {
      state.productLoading = false;
      state.success = false;
      state.error = error;
      state.newArrivals = [];
    });
    // get top sellers
    builder.addCase(handleGetTopSellers.pending, (state) => {
      state.productLoading = true;
      state.success = false;
      state.error = null;
      state.topSellers = [];
    });
    builder.addCase(handleGetTopSellers.fulfilled, (state, { payload }) => {
      state.productLoading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.topSellers = [];
      } else {
        state.error = null;
        state.topSellers = payload?.products;
      }
    });
    builder.addCase(handleGetTopSellers.rejected, (state, { error }) => {
      state.productLoading = false;
      state.success = false;
      state.error = error;
      state.topSellers = [];
    });
    // get all products
    builder.addCase(handleGetAllProducts.pending, (state) => {
      state.productLoading = true;
      state.success = false;
      state.error = null;
      state.allProducts = [];
    });
    builder.addCase(handleGetAllProducts.fulfilled, (state, { payload }) => {
      state.productLoading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.allProducts = [];
      } else {
        state.error = null;
        state.allProducts = payload?.products;
        state.minOrderAmount = payload?.minOrderAmount;
      }
    });
    builder.addCase(handleGetAllProducts.rejected, (state, { error }) => {
      state.productLoading = false;
      state.success = false;
      state.error = error;
      state.allProducts = [];
    });
    // get product by id
    builder.addCase(handleGetProductById.pending, (state) => {
      state.singleProductLoading = true;
      state.success = false;
      state.error = null;
      state.singleProduct = null;
    });
    builder.addCase(handleGetProductById.fulfilled, (state, { payload }) => {
      state.singleProductLoading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.singleProduct = null;
      } else {
        state.error = null;
        state.singleProduct = payload?.product;
      }
    });
    builder.addCase(handleGetProductById.rejected, (state, { error }) => {
      state.singleProductLoading = false;
      state.success = false;
      state.error = error;
      state.singleProduct = null;
    });
  },
});

export const {} = ProductSlice.actions;

export default ProductSlice.reducer;
