import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  getAllCategory,
  getAllAuthor,
  getAllPublisher,
  handleCreateProduct,
} from "../../redux/slice/admin/productSlice";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";

const ModalAddCategory = (props) => {
  const { showModalAdd, handleClose } = props;
  const [name, setName] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModalAdd === false) {
      clearInput();
    }
    
  }, [showModalAdd]);

  const clearInput = () => {
    setImage(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setPublisherId("");
    setAuthorId("");
    setImageAvatar(null);
  };

  const isValidAdd = () => {
    if (!name) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return false;
    }
    if (!price) {
      toast.error("Vui lòng nhập giá");
      return false;
    }
    if (!description) {
      toast.error("Vui lòng điền mô tả");
      return false;
    }
    if (!categoryId) {
      toast.error("Vui lòng chọn danh mục");
      return false;
    }
    if (!publisherId) {
      toast.error("Vui lòng chọn nhà xuất bản");
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn ảnh sản phẩm");
      return false;
    }
    if (isNaN(price)) {
      toast.error("Vui lòng nhập đúng giá");
      return false;
    }
    return true;
  };

  const selectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.indexOf(file.type) === -1 || file.size > 1024 * 1024) {
        toast.error("Vui lòng chọn đúng định dạng ảnh");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitAdd = async () => {
    let check = isValidAdd();
    if (check === true) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image, image.name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("CategoryId", categoryId);
      formData.append("PublisherId", publisherId);
      formData.append("AuthorId", authorId);
      console.log("data", formData);
      try {
        dispatch(handleCreateProduct(formData)).then((res) => {
          if (res.payload && res.payload.success === true) {
            toast.success(`${res.payload.message}`);
            clearInput();
          }
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
          <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Tên sản phẩm:</label>
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
            style={{ width: "150px" }}
            variant="primary"
            onClick={() => submitAdd()}
            type="button"
          >
            THÊM
          </Button>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={handleClose}
          >
            ĐÓNG
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddCategory;
