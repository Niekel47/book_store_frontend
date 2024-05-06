import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

const URL_API = UrlApi();

const initialState = {
  isLoadingProduct: false,
  isLoadingCategory: false,
  isLoadingAuthor: false,
  isLoadingPublisher: false,
  isLoadingUser: false,
  isErrorProduct: false,
  isErrorCategory: false,
  isErrorPublisher: false,
  isErrorUser: false,
  isErrorAuthor: false,
  listCategory: [],
  listPublisher: [],
  listAuthor: [],
  listAuthors: [],
  listProduct: [],
  listUser: [],
  createCategory: null,
  createAuthor: null,
  createPublisher: null,
  deleteCategory: null,
  deleteAuthor: null,
  deletePublisher: null,
  deleteUser: null,
  createProduct: null,
  deleteProduct: null,
  updateProduct: null,
  updateAuthor: null,
};

export const getAllCategory = createAsyncThunk(
  "product/getAllCategory",
  async (page) => {
    try {
      const res = await axios.get(URL_API + `category?${page}`);
      const data = await res.data.getallcat;
      const totalPagesCat = await res.data.totalPagesCat;
      return { data, totalPagesCat };
    } catch (error) {
      console.log(error);
    }
  }
);

export const CreateCategory = createAsyncThunk(
  "product/CreateCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `category`, formData);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const CreateAuthor = createAsyncThunk(
  "product/CreateAuthor",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `author`, formData);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const CreatePublisher = createAsyncThunk(
  "product/CreatePublisher",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `publisher`, formData);
      return res.data;
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
      const totalPagesPublihser = await res.data.totalPagesPublihser;
      return { data, totalPagesPublihser };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAuthor = createAsyncThunk(
  "product/getAllAuthor",
  async (page) => {
    try {
      const res = await axios.get(URL_API + `author`);
      const data = await res.data.getallAuthor;
      const totalPagesAuthor = res.data.totalPagesAuthor;
      return { data, totalPagesAuthor };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (page) => {
    try {
      const res = await axios.get(URL_API + `product?page=${page}`);
      const data = await res.data.products;
      const totalPages = await res.data.totalPages;
      const totalProducts = await res.data.totalProducts;
      return { data, totalPages, totalProducts };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllUser = createAsyncThunk("product/getAllUser", async () => {
  try {
    const res = await axios.get(URL_API + `user`);
    const data = await res.data.users;
    const totalPagesUser = await res.data.totalPages;
    return { data, totalPagesUser };
  } catch (error) {
    console.log(error);
  }
});

export const handleCreateProduct = createAsyncThunk(
  "product/handleCreateProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `product`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleUpdateProduct = createAsyncThunk(
  "product/handleUpdateProduct",
  async ({ product_id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(URL_API + `product/${product_id}`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });
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

export const handleDeleteCategory = createAsyncThunk(
  "product/handleDeleteCategory",
  async (category_id) => {
    try {
      const res = await axios.delete(URL_API + `category/${category_id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleDeleteAuthor = createAsyncThunk(
  "product/handleDeleteAuthor",
  async (author_id) => {
    try {
      const res = await axios.delete(URL_API + `author/${author_id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleDeletePublisher = createAsyncThunk(
  "product/handleDeletePublisher",
  async (publisher_id) => {
    try {
      const res = await axios.delete(URL_API + `publisher/${publisher_id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleDeleteUser = createAsyncThunk(
  "product/handleDeleteUser",
  async (user_id) => {
    try {
      const res = await axios.delete(URL_API + `user/${user_id}`, {
        withCredentials: true,
      });
      return res.data;
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
        state.listCategory = action.payload.data;
        state.totalPagesCat = action.payload.totalPagesCat;
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
        state.listPublisher = action.payload.data;
        state.totalPagesPublihser = action.payload.totalPagesPublihser;
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
        state.listAuthor = action.payload.data;
        state.totalPagesAuthor = action.payload.totalPagesAuthor;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllAuthor.rejected, (state, action) => {
        state.listAuthor = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get Author
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
      //Get All User
      .addCase(getAllUser.pending, (state, action) => {
        state.listUser = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.listUser = action.payload.data;
        state.totalPagesUser = action.payload.totalPagesUser;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
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
        console.log("data", action.payload);
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
      //Create Author
      .addCase(CreateAuthor.pending, (state, action) => {
        state.isLoadingAuthor = true;
        state.createAuthor = null;
        state.isErrorAuthor = false;
      })
      .addCase(CreateAuthor.fulfilled, (state, action) => {
        state.isLoadingAuthor = false;
        state.createAuthor = action.payload;
        state.isErrorAuthor = false;
      })
      .addCase(CreateAuthor.rejected, (state, action) => {
        state.isLoadingAuthor = false;
        state.createAuthor = null;
        state.isErrorAuthor = true;
      })
      //Create Publisher
      .addCase(CreatePublisher.pending, (state, action) => {
        state.isLoadingPublisher = true;
        state.createPublisher = null;
        state.isErrorPublisher = false;
      })
      .addCase(CreatePublisher.fulfilled, (state, action) => {
        state.isLoadingPublisher = false;
        state.createPublisher = action.payload;
        state.isErrorPublisher = false;
      })
      .addCase(CreatePublisher.rejected, (state, action) => {
        state.isLoadingPublisher = false;
        state.createPublisher = null;
        state.isErrorPublisher = true;
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
      })
      .addCase(handleDeleteCategory.pending, (state, action) => {
        state.isLoadingCategory = true;
        state.deleteCategory = null;
        state.isErrorCategory = false;
      })
      .addCase(handleDeleteCategory.fulfilled, (state, action) => {
        state.isLoadingCategory = false;
        state.deleteCategory = action.payload;
        state.isErrorCategory = false;
      })
      .addCase(handleDeleteCategory.rejected, (state, action) => {
        state.isLoadingCategory = false;
        state.deleteCategory = null;
        state.isErrorCategory = true;
      })
      .addCase(handleDeleteAuthor.pending, (state, action) => {
        state.isLoadingAuthor = true;
        state.deleteAuthor = null;
        state.isErrorAuthor = false;
      })
      .addCase(handleDeleteAuthor.fulfilled, (state, action) => {
        state.isLoadingAuthor = false;
        state.deleteAuthor = action.payload;
        state.isErrorAuthor = false;
      })
      .addCase(handleDeleteAuthor.rejected, (state, action) => {
        state.isLoadingAuthor = false;
        state.deleteAuthor = null;
        state.isErrorAuthor = true;
      })
      .addCase(handleDeletePublisher.pending, (state, action) => {
        state.isLoadingPublisher = true;
        state.deletePublisher = null;
        state.isErrorPublisher = false;
      })
      .addCase(handleDeletePublisher.fulfilled, (state, action) => {
        state.isLoadingPublisher = false;
        state.deletePublisher = action.payload;
        state.isErrorPublisher = false;
      })
      .addCase(handleDeletePublisher.rejected, (state, action) => {
        state.isLoadingPublisher = false;
        state.deleteUser = null;
        state.isErrorPublisher = true;
      })
      .addCase(handleDeleteUser.pending, (state, action) => {
        state.isLoadingUser = true;
        state.deleteUser = null;
        state.isErrorUser = false;
      })
      .addCase(handleDeleteUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.deleteUser = action.payload;
        state.isErrorUser = false;
      })
      .addCase(handleDeleteUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.deletePublisher = null;
        state.isErrorUser = true;
      });
  },
});

export default productSlice.reducer;
