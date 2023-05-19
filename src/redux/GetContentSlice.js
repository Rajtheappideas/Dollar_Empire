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

export const handleGetCategory = createAsyncThunk(
  "getContent/handleGetCategory",
  async () => {
    toast.dismiss();
    const response = await GetUrl("category", {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetSubCategory = createAsyncThunk(
  "getContent/handleGetSubCategory",
  async () => {
    toast.dismiss();
    const response = await GetUrl("subcategory", {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetAllProducts = createAsyncThunk(
  "getContent/handleGetAllProducts",
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
  "getContent/handleGetNewArrivals",
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
  "getContent/handleGetTopSellers",
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
  "getContent/handleGetProductById",
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

export const handleGetBanners = createAsyncThunk(
  "getContent/handleGetBanners",
  async () => {
    toast.dismiss();
    const response = await GetUrl(`banner`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetAboutusContent = createAsyncThunk(
  "getContent/handleGetAboutusContent",
  async () => {
    toast.dismiss();
    const response = await GetUrl(`about`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetPrivacyContent = createAsyncThunk(
  "getContent/handleGetPrivacyContent",
  async () => {
    toast.dismiss();
    const response = await GetUrl(`privacy`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetShippingAndFreightContent = createAsyncThunk(
  "getContent/handleGetShippingAndFreightContent",
  async () => {
    toast.dismiss();
    const response = await GetUrl(`shipping-freight`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const handleGetUserFavourites = createAsyncThunk(
  "getContent/handleGetUserFavourites",
  async ({ token }) => {
    toast.dismiss();
    const response = await GetUrl(`favourite`, {
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

export const handleGetSpecialOrders = createAsyncThunk(
  "getContent/handleGetSpecialOrders",
  async () => {
    toast.dismiss();
    const response = await GetUrl(`special-orders`, {})
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
  categories: [],
  subCategories: [],
  newArrivals: [],
  topSellers: [],
  singleProduct: null,
  banners: [],
  featured: [],
  privacyNotice: null,
  shippingAndFreight: null,
  aboutUs: null,
  favourites: [],
  allProducts: [],
  specialOrders: null,
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
    // get categories
    builder.addCase(handleGetCategory.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.categories = [];
    });
    builder.addCase(handleGetCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.categories = [];
      } else {
        state.error = null;
        state.categories = payload?.categories;
      }
    });
    builder.addCase(handleGetCategory.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.categories = [];
    });
    // get sub categories
    builder.addCase(handleGetSubCategory.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.subCategories = [];
    });
    builder.addCase(handleGetSubCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.subCategories = [];
      } else {
        state.error = null;
        state.subCategories = payload?.categories;
      }
    });
    builder.addCase(handleGetSubCategory.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.subCategories = [];
    });
    // get new arrivals
    builder.addCase(handleGetNewArrivals.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.newArrivals = [];
    });
    builder.addCase(handleGetNewArrivals.fulfilled, (state, { payload }) => {
      state.loading = false;
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
      state.loading = false;
      state.success = false;
      state.error = error;
      state.newArrivals = [];
    });
    // get top sellers
    builder.addCase(handleGetTopSellers.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.topSellers = [];
    });
    builder.addCase(handleGetTopSellers.fulfilled, (state, { payload }) => {
      state.loading = false;
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
      state.loading = false;
      state.success = false;
      state.error = error;
      state.topSellers = [];
    });
    // get product by id
    builder.addCase(handleGetProductById.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.singleProduct = null;
    });
    builder.addCase(handleGetProductById.fulfilled, (state, { payload }) => {
      state.loading = false;
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
      state.loading = false;
      state.success = false;
      state.error = error;
      state.singleProduct = null;
    });
    // get banners
    builder.addCase(handleGetBanners.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.banners = [];
    });
    builder.addCase(handleGetBanners.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.banners = [];
        state.featured = [];
      } else {
        state.error = null;
        state.banners = payload?.banners;
        state.featured = payload?.featured;
      }
    });
    builder.addCase(handleGetBanners.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.banners = [];
    });
    // get aboutus content
    builder.addCase(handleGetAboutusContent.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.aboutUs = null;
    });
    builder.addCase(handleGetAboutusContent.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.aboutUs = null;
      } else {
        state.error = null;
        state.aboutUs = payload?.page;
      }
    });
    builder.addCase(handleGetAboutusContent.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.aboutUs = null;
    });
    // get privacy content
    builder.addCase(handleGetPrivacyContent.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.privacyNotice = null;
    });
    builder.addCase(handleGetPrivacyContent.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.privacyNotice = null;
      } else {
        state.error = null;
        state.privacyNotice = payload?.page;
      }
    });
    builder.addCase(handleGetPrivacyContent.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.privacyNotice = null;
    });
    // get shipping&freight content
    builder.addCase(handleGetShippingAndFreightContent.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.shippingAndFreight = null;
    });
    builder.addCase(
      handleGetShippingAndFreightContent.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        if (payload.status === "fail") {
          state.error = payload;
          state.shippingAndFreight = null;
        } else {
          state.error = null;
          state.shippingAndFreight = payload?.page;
        }
      }
    );
    builder.addCase(
      handleGetShippingAndFreightContent.rejected,
      (state, { error }) => {
        state.loading = false;
        state.success = false;
        state.error = error;
        state.shippingAndFreight = null;
      }
    );
    // get special orders
    builder.addCase(handleGetSpecialOrders.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.specialOrders = null;
    });
    builder.addCase(handleGetSpecialOrders.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.specialOrders = null;
      } else {
        state.error = null;
        state.specialOrders = payload?.page;
      }
    });
    builder.addCase(handleGetSpecialOrders.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.specialOrders = null;
    });
    // get users favourites
    builder.addCase(handleGetUserFavourites.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.favourites = [];
    });
    builder.addCase(handleGetUserFavourites.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.favourites = [];
      } else {
        state.error = null;
        state.favourites = payload?.favourites;
      }
    });
    builder.addCase(handleGetUserFavourites.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.favourites = [];
    });
    // get all products
    builder.addCase(handleGetAllProducts.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.allProducts = [];
    });
    builder.addCase(handleGetAllProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      if (payload.status === "fail") {
        state.error = payload;
        state.allProducts = [];
      } else {
        state.error = null;
        state.allProducts = payload?.products;
      }
    });
    builder.addCase(handleGetAllProducts.rejected, (state, { error }) => {
      state.loading = false;
      state.success = false;
      state.error = error;
      state.allProducts = [];
    });
  },
});

export const {} = GetContentSlice.actions;

export default GetContentSlice.reducer;
