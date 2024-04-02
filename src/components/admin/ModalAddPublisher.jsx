import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { CreatePublisher } from "../../redux/slice/admin/productSlice";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";

const ModalAddPublisher = (props) => {
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
      toast.error("Vui lòng nhập tên NXB");
      return false;
    }
    return true;
  };

  const submitAdd = async () => {
    let check = isValidAdd();
    if (check === true) {
       const data = { name: name };
       console.log("data", data);
      try {
        dispatch(CreatePublisher(data)).then((res) => {
          toast.success("Thêm thành công");
          clearInput();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Modal size="xl" show={showModalAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÊM NHÀ XUẤT BẢN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Tên nhà xuất bản:</label>
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

export default ModalAddPublisher;
