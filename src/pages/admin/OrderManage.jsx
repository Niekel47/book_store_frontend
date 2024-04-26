import React, { useState, useEffect } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { getOrder } from "../../axios/service";
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import ModalOrder from "../../components/admin/ModalOrder";
import {
  getOrderDetail,
  handleConfirmOrder,
  handleDeleteOrder,
} from "../../redux/slice/admin/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PieChartComponent from "./PieChart";
import PieChartTotal from "./PieChartTotal";
import { calculateRevenue } from "./convertDataChart";
import PieChartDoanhThu from "./PieChartDoanhThu";

const OrderManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccessConfirmOrder, isSuccessDeleteOrder } = useSelector(
    (state) => state.admin.order
  );
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataOrder, setDataOrder] = useState({});
 
  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    fetchAllOrder();
  }, [page, isSuccessConfirmOrder, isSuccessDeleteOrder]);

  const fetchAllOrder = async () => {
    try {
      const res = await getOrder(page);
      setListOrder(res.data.getallOrder);
      setTotalPage(res.data.totalPagesOrder);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };
  const paymentData = listOrder.map((order) => order.payment);
  const totalData = listOrder.map((order) => order.total);
  const revenueData = calculateRevenue(listOrder);
  console.log("revenueData", revenueData);
  const displayStatus = (status, order_id) => {
    let statusContent;
    switch (status) {
      case 0:
        statusContent = (
          <div>
            <p style={{ color: "#ce1515" }}>Chờ xác nhận</p>
          </div>
        );
        break;
      case 1:
        statusContent = (
          <div>
            <p style={{ color: "#01bacf" }}>Đang giao</p>
          </div>
        );
        break;
      case 2:
        statusContent = (
          <div>
            <p style={{ color: "#198754" }}>Hoàn thành</p>
          </div>
        );
        break;
      case 3:
        statusContent = (
          <div>
            <p style={{ color: "#ce1515" }}>Đã hủy</p>
          </div>
        );
        break;

      default:
        statusContent = <div>Invalid star value</div>;
        break;
    }

    return statusContent;
  };

  const OrderDetail = (order) => {
    dispatch(getOrderDetail(order.id)).then((res) => {
      if (res.payload && res.payload.success) {
        setDataOrder(res.payload);
        setShowModal(true);
      }
    });
  };
  const handleClose = () => {
    setShowModal(false);
  };
 console.log("listOrder", listOrder);
  const confirmClick = (order_id, status) => {
    console.log("status", status);
    if (status != 0) {
      toast.error("Vui lòng chọn đơn hàng khác!");
    } else {
      dispatch(handleConfirmOrder(order_id));
      toast.success("Duyệt đơn hàng thành công!");
    }
  };

  const deleteClick = (order_id) => {
    dispatch(handleDeleteOrder(order_id));
    toast.success("Xóa đơn hàng thành công!")
  };
  return (
    <>
      <ModalOrder
        dataOrder={dataOrder}
        showModal={showModal}
        handleClose={handleClose}
      />

      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <Sidebar />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}

          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div className="flex justify-center">
                <PieChartComponent data={paymentData} />
                <PieChartTotal data={totalData} />
                <PieChartDoanhThu data={revenueData} />
              </div>

              <div className="container-fluid"></div>
              <table className="table caption-top bg-white rounded mt-2">
                <caption className="text fs-4">QUẢN LÝ ĐƠN HÀNG</caption>

                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrder &&
                    listOrder.length > 0 &&
                    listOrder.map((item, index) => {
                      const displayIndex = (page - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{displayIndex}</th>
                          <td>{item.name}</td>
                          <td>{displayStatus(item.status, item.id)}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td
                            style={{
                              color: "#883731",
                              fontWeight: "bold",
                            }}
                          >
                            {item.total.toLocaleString("vi-VN")} đ
                          </td>
                          <td>
                            <MdDelete
                              style={{
                                fontSize: "25px",
                                marginRight: "10px",
                                cursor: "pointer",
                                color: "#dc0000",
                              }}
                              onClick={() => deleteClick(item.id)}
                            />
                            <FaEye
                              onClick={() => OrderDetail(item)}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                color: "#5bc0de",
                              }}
                            />
                            <GiConfirmed
                              onClick={() => confirmClick(item.id, item.status)}
                              className="text-green-700 text-lg cursor-pointer ml-1"
                            >
                              Duyệt
                            </GiConfirmed>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
      </div>
    </>
  );
};
export default OrderManage;
