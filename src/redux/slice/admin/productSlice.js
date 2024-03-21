import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

const URL_API = UrlApi();

const initialState = {
  isLoadingProduct: false,
  isErrorProduct: false,
  listCategory: [],
  listPublisher: [],
  listAuthor: [],
  storeProduct: null,
  deleteProduct: null,
  updateProduct: null,
};

export const getCategory = createAsyncThunk("product/getCategory", async () => {
  try {
    const res = await axios.get(URL_API + `/category`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getPublisher = createAsyncThunk(
  "product/getPublisher",
  async () => {
    try {
      const res = await axios.get(URL_API + `/publisher`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAuthor = createAsyncThunk("product/getAuthor", async () => {
  try {
    const res = await axios.get(URL_API + `/author`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const handleCreateProduct = createAsyncThunk(
  "product/handleCreateProduct",
  async (data_add, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/product`, data_add, {
        headers: { "content-type": "multipart/form-data" },
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleUpdateProduct = createAsyncThunk(
  "product/handleUpdateProduct",
  async (data_update, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        URL_API + `/admin/products/update`,
        data_update,
        {
          headers: { "content-type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleDeleteProduct = createAsyncThunk(
  "product/handleDeleteProduct",
  async (product_id) => {
    try {
      const res = await axios.delete(URL_API + `/product/${product_id}`, {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "admin/product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get Category
      .addCase(getCategory.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.listCategory = null;
        state.isErrorProduct = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoadingProduct = true;
        state.listCategory = action.payload.category;
        state.isErrorProduct = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.listCategory = null;
        state.isErrorProduct = true;
      })
      .addCase(getPublisher.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.listPublisher = null;
        state.isErrorProduct = null;
      })
      .addCase(getPublisher.fulfilled, (state, action) => {
        state.isLoadingProduct = true;
        state.listPublisher = action.payload.publisher;
        state.isErrorProduct = null;
      })
      .addCase(getPublisher.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.listPublisher = null;
        state.isErrorProduct = true;
      })
      .addCase(getAuthor.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.listAuthor = null;
        state.isErrorProduct = null;
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.isLoadingProduct = true;
        state.listAuthor = action.payload.author;
        state.isErrorProduct = null;
      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.listAuthor = null;
        state.isErrorProduct = true;
      })
      //   Store Product
      .addCase(handleCreateProduct.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.storeProduct = null;
        state.isErrorProduct = false;
      })
      .addCase(handleCreateProduct.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.storeProduct = action.payload;
        state.isErrorProduct = false;
      })
      .addCase(handleCreateProduct.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.storeProduct = null;
        state.isErrorProduct = true;
      })
      // Update Product
      .addCase(handleUpdateProduct.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.updateProduct = null;
        state.isErrorProduct = false;
      })
      .addCase(handleUpdateProduct.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.updateProduct = action.payload;
        state.isErrorProduct = false;
      })
      .addCase(handleUpdateProduct.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.updateProduct = null;
        state.isErrorProduct = true;
      })
      // Delete Product
      .addCase(handleDeleteProduct.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.deleteProduct = null;
        state.isErrorProduct = false;
      })
      .addCase(handleDeleteProduct.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.deleteProduct = action.payload;
        state.isErrorProduct = false;
      })
      .addCase(handleDeleteProduct.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.deleteProduct = null;
        state.isErrorProduct = true;
      });
  },
});

export default productSlice.reducer;
