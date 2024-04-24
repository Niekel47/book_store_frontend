import axios from "axios";
import { UrlApi } from "../../url";

const URL_API = UrlApi();

// const getProductCategory = async (category_id, page) => {
//   return await axios.get(URL_API + `/categories/${category_id}?page=${page}`);
// };

const getProductSearch = async (name, page) => {
  return await axios.get(URL_API + `product/search?name=${name}&page=${page}`);
};

// const getOrderAdmin = async (page) => {
//   return await axios.get(URL_API + `/admin/dashboard?page=${page}`, {
//     withCredentials: true,
//   });
// };

const getOrder = async (page) => {
  return await axios.get(URL_API + `/order?page=${page}`, {
    withCredentials: true,
  });
};

// const getProductAdmin = async () => {
//   return await axios.get(URL_API + `/product`, {
//     withCredentials: true,
//   });
// };

export { getOrder, getProductSearch };
