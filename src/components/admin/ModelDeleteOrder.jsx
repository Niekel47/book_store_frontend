import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDeleteOrder = ({
  showModalDelete,
  handleCloseDelete,
  deleteClick,
  orderToDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa đơn hàng này không?</Modal.Body>
      <Modal.Footer>
        <Button
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-400"
          onClick={handleCloseDelete}
        >
          Đóng
        </Button>
        <Button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-400 ml-2"
          onClick={() => deleteClick(orderToDelete)}
        >
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteOrder;
