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
import ReactPaginate from "react-paginate";

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    setPage(currentPage);
    dispatch(fetchAllProduct(currentPage));
  };
  useEffect(() => {
    dispatch(
      fetchAllProduct({
        categoryIds: selectedCategories.join(","),
        authorIds: selectedAuthors.join(","),
        publisherIds: selectedPublishers.join(","),
        sort: `price:${sortOrder}`,
        page: page,
        limit: 10,
      }),
      setTotalPage(Pagecount)
    );
    dispatch(fetchAllPublisher());
    dispatch(fetchAllCategory());
    dispatch(fetchAllAuthor());
    // dispatch(getProductDetail());
  }, [
    page,
    selectedCategories,
    selectedAuthors,
    selectedPublishers,
    sortOrder,
  ]);
  const Pagecount = useSelector(
    (state) => state.customer.product.totalPagesProduct
  );
  console.log("Pagecount", Pagecount);

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
              <div className="w-[15%] ">
                <h2 className="text-lg font-semibold mb-2">Filters:</h2>
                <div className="mb-3">
                  <label htmlFor="sortOrder" className="mr-2">
                    Sort by price:
                  </label>
                  <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
                <ul>
                  <li>
                    <h3 className="font-semibold">Danh Mục:</h3>
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
                    <h3 className="font-semibold">Tác Giả:</h3>
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
                    <h3 className="font-semibold">Nhà Xuất Bản:</h3>
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
              <section className="w-[85%] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 section-name padding-y-sm ">
                {/* Card */}
                {listProducts.map((item, index) => (
                  <div key={item.id} className="div space-y-3 ">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt=""
                        className="h-[220px] w-[220px] object-cover rounded-md"
                      />
                    </Link>

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
              </section>
            </div>
            <ReactPaginate
              nextLabel=" >"
              onPageChange={(e) => handlePageClick(e)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="< "
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailList;
