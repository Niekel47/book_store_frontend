import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { CreateAuthor } from "../../redux/slice/admin/productSlice";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";

const ModalAddAuthor = (props) => {
  const { showModalAdd, handleClose } = props;
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (showModalAdd === false) {
      clearInput();
    }
  }, [showModalAdd]);

  const clearInput = () => {
    setName("");
  };

  const isValidAdd = () => {
    if (!name) {
      toast.error("Vui lòng nhập tên danh mục");
      return false;
    }
    return true;
  };

  const submitAdd = () => {
    let check = isValidAdd();
    if (check === true) {
      const data = { name: name };
      console.log("data", data);
      if (name) {
        // Check if name is defined
        try {
          dispatch(CreateAuthor(data)).then((res) => {
            toast.success("Thêm thành công");
            clearInput();
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Name is undefined");
      }
    }
  };

  return (
    <>
      <Modal size="xl" show={showModalAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÊM TÁC GIẢ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Tên tác giả:</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-success text-black"
            onClick={() => submitAdd()}
            type="button"
          >
            THÊM
          </Button>
          <Button className="btn btn-warning" onClick={handleClose}>
            ĐÓNG
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddAuthor;
