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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
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
        categoryId: selectedCategory,
        authorId: selectedAuthor,
        publisherId: selectedPublisher,
        sort: `price:${sortOrder}`,
        page: page,
        limit: 10,
      }),
      setTotalPage(Pagecount)
    );
    dispatch(fetchAllPublisher());
    dispatch(fetchAllCategory());
    dispatch(fetchAllAuthor());
  }, [page, selectedCategory, selectedAuthor, selectedPublisher, sortOrder]);

  const handleFilterChange = (filterType, filterValue) => {
    switch (filterType) {
      case "category":
        setSelectedCategory(filterValue);
        break;
      case "author":
        setSelectedAuthor(filterValue);
        break;
      case "publisher":
        setSelectedPublisher(filterValue);
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
              Sách Hay dành cho Bạn
            </p>
            <h1 className="text-3xl font-bold">Sách HOT</h1>
          </div>

          {/* Body section */}
          <div className="">
            {/* Filters */}
            <div className="flex justify-between mb-5">
              <div className="w-[16%] ">
                <h2 className="text-lg font-semibold mb-2">
                  Tìm kiếm sản phẩm
                </h2>
                <div className="mb-3">
                  <label htmlFor="sortOrder" className="mr-2">
                    Tìm kiếm theo giá:
                  </label>
                  <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Sắp xếp theo thứ tự tăng dần</option>
                    <option value="desc">Sắp xếp theo thứ tự giảm dần</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="mr-2">
                    Danh Mục:
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  >
                    <option value="category">Tất cả</option>
                    {listCategory.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="mr-2">
                    Tác Giả:
                  </label>
                  <select
                    id="author"
                    value={selectedAuthor}
                    onChange={(e) =>
                      handleFilterChange("author", e.target.value)
                    }
                  >
                    <option value="">Tất cả</option>
                    {listAuthor.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="publisher" className="mr-2">
                    Nhà Xuất Bản:
                  </label>
                  <select
                    id="publisher"
                    value={selectedPublisher}
                    onChange={(e) =>
                      handleFilterChange("publisher", e.target.value)
                    }
                  >
                    <option value="">Tất cả</option>
                    {listPublisher.map((publisher) => (
                      <option key={publisher.id} value={publisher.id}>
                        {publisher.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Products */}
              <section className="w-[70%] grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-start gap-5 section-name padding-y-sm ">
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Pagecount}
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
      </div>
    </>
  );
};

export default ProductDetailList;