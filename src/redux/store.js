import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slice/customer/productSlice";
import authReducer from "./slice/customer/authSlice";
import productAdminReducer from "./slice/admin/productSlice";
import authAdminReducer from "./slice/admin/authSlice";
import cartReducer from "./slice/customer/cartSlice";
import orderReducer from "./slice/customer/orderSlice";

const rootReducer = combineReducers({
  customer: combineReducers({
    product: productReducer,
    auth: authReducer,

    cart: cartReducer,
     order: orderReducer,
    //  category: categoryReducer,
    //  rate: rateReducer,
  }),
  admin: combineReducers({
    //  order: orderAdminReducer,
    product: productAdminReducer,
    auth: authAdminReducer,

    //  auth: authAdminReducer,
  }),
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
