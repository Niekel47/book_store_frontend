import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../../url.js";

const URL_API = UrlApi();
const initialState = {
  listProduct: [],
  listCategory: [],
  listAuthor: [],
  listPublisher: [],
  listProductSearch: [],
  totalPage: 0,
  isLoading: false,
  isError: false,
  productDetail: null,
  rate: [],
  countRate: 0,
  countStar: {},
  provinces: [],
  districts: [],
  wards: [],
};

export const fetchProductHome = createAsyncThunk(
  "product/fetchProductHome",
  async () => {
    try {
      const res = await axios.get(URL_API + `/product?limit=5&page=1`);
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (params) => {
    try {
      const res = await axios.get(URL_API + `product`, { params });
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllCategory = createAsyncThunk(
  "product/fetchAllCategory",
  async () => {
    try {
      const res = await axios.get(URL_API + `category`);
      return res.data.getallcat;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllAuthor = createAsyncThunk(
  "product/fetchAllAuthor",
  async () => {
    try {
      const res = await axios.get(URL_API + `author`);
      return res.data.getallAuthor;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllPublisher = createAsyncThunk(
  "product/fetchAllPublisher",
  async () => {
    try {
      const res = await axios.get(URL_API + `publisher`);
      return res.data.getPublisher;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (product_id) => {
    try {
      const res = await axios.get(URL_API + `product/${product_id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductSearch = createAsyncThunk(
  "product/getProductSearch",
  async (data) => {
    try {
      const res = await axios.get(
        URL_API + `/search/${data.name}/${data.page}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProvinces = createAsyncThunk(
  "product/fetchProvinces",
  async () => {
    const response = await axios.get(URL_API + `province`);
    return response.data.results;
  }
);

export const fetchDistricts = createAsyncThunk(
  "product/fetchDistricts",
  async (province_id) => {
    const response = await axios.get(
      URL_API + `province/district/${province_id}`
    );
    return response.data.results;
  }
);

export const fetchWards = createAsyncThunk(
  "product/fetchWards",
  async (district_id) => {
    const response = await axios.get(URL_API + `province/ward/${district_id}`);
    return response.data.results;
  }
);

export const productSlice = createSlice({
  name: "/product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductHome.pending, (state, action) => {
        state.listProduct = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProductHome.fulfilled, (state, action) => {
        state.listProduct = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchProductHome.rejected, (state, action) => {
        state.listProduct = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get All Product
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.listProduct = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.listProduct = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.listProduct = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get All Category
      .addCase(fetchAllCategory.pending, (state, action) => {
        state.listCategory = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.listCategory = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.listCategory = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get All Author
      .addCase(fetchAllAuthor.pending, (state, action) => {
        state.listAuthor = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllAuthor.fulfilled, (state, action) => {
        state.listAuthor = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllAuthor.rejected, (state, action) => {
        state.listAuthor = [];
        state.isLoading = false;
        state.isError = true;
      })
      //Get All Publisher
      .addCase(fetchAllPublisher.pending, (state, action) => {
        state.listPublisher = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllPublisher.fulfilled, (state, action) => {
        state.listPublisher = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllPublisher.rejected, (state, action) => {
        state.listPublisher = [];
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      //Provinces
      .addCase(fetchProvinces.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      //District
      .addCase(fetchDistricts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      //Ward
      .addCase(fetchWards.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.wards = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchWards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductSearch.pending, (state, action) => {
        state.listProductSearch = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductSearch.fulfilled, (state, action) => {
        state.listProductSearch = action.payload.products;
        state.totalPage = action.payload.total_page;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductSearch.rejected, (state, action) => {
        state.listProductSearch = [];
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
