import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

const URL_API = UrlApi();

const initialState = {
  isLoadingProduct: false,
  isLoadingCategory: false,
  isErrorProduct: false,
  isErrorCategory: false,
  listCategory: [],
  listPublisher: [],
  listAuthor: [],
  listProduct: [],

  createCategory: null,
  createProduct: null,
  deleteProduct: null,
  updateProduct: null,
};

export const getAllCategory = createAsyncThunk(
  "product/getAllCategory",
  async () => {
    try {
      const res = await axios.get(URL_API + `/category`);
      const data = await res.data.getallcat;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const CreateCategory = createAsyncThunk(
  "product/CreateCategory",
  async (data_cat, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `category`, data_cat, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });
      const data = await res.data.post;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getAllPublisher = createAsyncThunk(
  "product/getAllPublisher",
  async () => {
    try {
      const res = await axios.get(URL_API + `/publisher`);
      const data = await res.data.getPublisher;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAuthor = createAsyncThunk(
  "product/getAllAuthor",
  async () => {
    try {
      const res = await axios.get(URL_API + `/author`);
      const data = await res.data.getallAuthor;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllProduct = createAsyncThunk("product/getAllProduct", async () => {
  try {
    const res = await axios.get(URL_API + `product`);
    const data = await res.data.products;
    const totalPages = await res.data.totalPages;
    return { data, totalPages };
  } catch (error) {
    console.log(error);
  }
});

export const handleCreateProduct = createAsyncThunk(
  "product/handleCreateProduct",
  async ( { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `product`,  {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });
      const data = await res.data.newProduct;
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
        URL_API + `product/update`,
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
      .addCase(getAllCategory.pending, (state, action) => {
        state.listCategory = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.listCategory = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.listCategory = [];
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAllPublisher.pending, (state, action) => {
        state.listPublisher = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllPublisher.fulfilled, (state, action) => {
        state.listPublisher = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllPublisher.rejected, (state, action) => {
        state.listPublisher = [];
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllAuthor.pending, (state, action) => {
        state.listAuthor = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllAuthor.fulfilled, (state, action) => {
        state.listAuthor = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllAuthor.rejected, (state, action) => {
        state.listAuthor = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get list Product
      .addCase(getAllProduct.pending, (state, action) => {
        state.listProduct = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.listProduct = action.payload.data;
        state.totalPages = action.payload.totalPages; 
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.listProduct = [];
        state.isLoading = false;
        state.isError = true;
      })
      //   Store Product
      .addCase(handleCreateProduct.pending, (state, action) => {
        state.isLoadingProduct = true;
        state.createProduct = null;
        state.isErrorProduct = false;
      })
      .addCase(handleCreateProduct.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.createProduct = action.payload;
        state.isErrorProduct = false;
      })
      .addCase(handleCreateProduct.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.createProduct = null;
        state.isErrorProduct = true;
      })
      //Create Category
      .addCase(CreateCategory.pending, (state, action) => {
        state.isLoadingCategory = true;
        state.createCategory = null;
        state.isErrorCategory = false;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.isLoadingCategory = false;
        state.createCategory = action.payload;
        state.isErrorCategory = false;
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.isLoadingCategory = false;
        state.createCategory = null;
        state.isErrorCategory = true;
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
