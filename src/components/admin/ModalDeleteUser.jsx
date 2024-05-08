import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { handleDeleteUser } from "../../redux/slice/admin/productSlice";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { userId, showModalDelete, handleClose } = props;
  const dispatch = useDispatch();

  const deleteUser = () => {
    try {
      dispatch(handleDeleteUser(userId)).then((res) => {
        toast.success("Xóa thành công");
        handleClose();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={showModalDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Người Dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa người dùng này không?</Modal.Body>
        <Modal.Footer>
          <Button
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-400"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-400 ml-2"
            onClick={deleteUser}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
