import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDeleteCategory = ({
  showModalDelete,
  handleCloseDelete,
  deleteClick,
  categoryToDelete,
}) => {
  return (
    <Modal show={showModalDelete} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận xóa danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này không?</Modal.Body>
      <Modal.Footer>
        <Button
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-400"
          onClick={handleCloseDelete}
        >
          Đóng
        </Button>
        <Button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-400 ml-2"
          onClick={() => deleteClick(categoryToDelete)}
        >
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteCategory;
