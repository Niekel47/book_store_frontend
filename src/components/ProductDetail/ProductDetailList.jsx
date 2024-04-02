import React, { useEffect, useState } from "react";
import axios from "axios";
import { UrlApi, UrlImage } from "../../../url";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProduct,
  fetchAllCategory,
  fetchAllPublisher,
  fetchAllAuthor,
} from "../../redux/slice/customer/productSlice";
import { Link } from "react-router-dom";

const ProductDetailList = () => {
  const URL_Image = UrlImage();
  const listProducts = useSelector(
    (state) => state.customer.product.listProduct
  );
  const listCategory = useSelector(
    (state) => state.customer.product.listCategory
  );
  const listAuthor = useSelector((state) => state.customer.product.listAuthor);
  const listPublisher = useSelector(
    (state) => state.customer.product.listPublisher
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllPublisher());
    dispatch(fetchAllCategory());
    dispatch(fetchAllAuthor());
  }, []);

  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);

  // Function to handle filter changes
  const handleFilterChange = (filterType, filterId) => {
    switch (filterType) {
      case "category":
        setSelectedCategories(
          selectedCategories.includes(filterId)
            ? selectedCategories.filter((id) => id !== filterId)
            : [...selectedCategories, filterId]
        );
        break;
      case "author":
        setSelectedAuthors(
          selectedAuthors.includes(filterId)
            ? selectedAuthors.filter((id) => id !== filterId)
            : [...selectedAuthors, filterId]
        );
        break;
      case "publisher":
        setSelectedPublishers(
          selectedPublishers.includes(filterId)
            ? selectedPublishers.filter((id) => id !== filterId)
            : [...selectedPublishers, filterId]
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mt-4 mb-12">
        <div className="container">
          {/* header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Top Books for you
            </p>
            <h1 className="text-3xl font-bold">Top Books</h1>
          </div>

          {/* Body section */}
          <div className="">
            {/* Filters */}
            <div className="flex justify-between mb-5">
              <div className="mr-7 ">
                <h2 className="text-xl font-semibold mb-2">Filters:</h2>
                <ul>
                  <li>
                    <h3 className="font-semibold">Categories:</h3>
                    <ul>
                      {listCategory.map((category) => (
                        <li key={category.id}>
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onChange={() =>
                              handleFilterChange("category", category.id)
                            }
                          />
                          <label htmlFor={`category-${category.id}`}>
                            {category.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <h3 className="font-semibold">Authors:</h3>
                    <ul>
                      {listAuthor.map((author) => (
                        <li key={author.id}>
                          <input
                            type="checkbox"
                            id={`author-${author.id}`}
                            checked={selectedAuthors.includes(author.id)}
                            onChange={() =>
                              handleFilterChange("author", author.id)
                            }
                          />
                          <label htmlFor={`author-${author.id}`}>
                            {author.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <h3 className="font-semibold">Publishers:</h3>
                    <ul>
                      {listPublisher.map((publisher) => (
                        <li key={publisher.id}>
                          <input
                            type="checkbox"
                            id={`publisher-${publisher.id}`}
                            checked={selectedPublishers.includes(publisher.id)}
                            onChange={() =>
                              handleFilterChange("publisher", publisher.id)
                            }
                          />
                          <label htmlFor={`publisher-${publisher.id}`}>
                            {publisher.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 ">
                {/* Card */}
                {listProducts.map((item, index) => (
                  <div key={item.id} className="div space-y-3 ">
                    <div className="relative group">
                      <Link>
                        <img
                          src={URL_Image + item.image}
                          alt=""
                          className="h-[220px] w-[150px] object-cover rounded-md "
                        />
                      </Link>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-blue-500 text-white rounded mr-2 cursor-pointer">
                          Mua ngay
                        </button>
                        <button className="p-2 bg-green-500 text-white rounded cursor-pointer">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>

                    <p className="flex justify-center items-center gap-1">
                      {item.name}
                    </p>
                    <p className="flex justify-center items-center gap-1">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                    <div>
                      <div className="flex justify-center items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailList;
