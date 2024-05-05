import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDeleteProduct = ({
  showModalDelete,
  handleCloseDelete,
  deleteClick,
  productToDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này không?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          Đóng
        </Button>
        <Button variant="danger" onClick={() => deleteClick(productToDelete)}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteProduct;
