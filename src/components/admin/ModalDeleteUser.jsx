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
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;