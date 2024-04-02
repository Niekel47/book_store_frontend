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

const ModalAddProduct = (props) => {
  const { showModalAdd, handleClose } = props;
  const [image, setImage] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [CategoryIds, setCategoryIds] = useState(""); // Thay đổi khởi tạo là ""
  const [PublisherId, setPublisherId] = useState(""); // Thay đổi khởi tạo là ""
  const [AuthorId, setAuthorId] = useState(""); // Khởi tạo là null
  const { listCategory, listPublisher, listAuthor } = useSelector(
    (state) => state.admin.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModalAdd === false) {
      clearInput();
    }
    dispatch(getAllCategory());
    dispatch(getAllAuthor());
    dispatch(getAllPublisher());
  }, [showModalAdd]);

  const clearInput = () => {
    setImage(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategoryIds("");
    setPublisherId("");
    setAuthorId("");
    setQuantity("");
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
    if (!CategoryIds) {
      toast.error("Vui lòng chọn danh mục");
      return false;
    }
    if (!PublisherId) {
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
      if (!CategoryIds || !PublisherId || !AuthorId) {
        toast.error("Vui lòng chọn danh mục, nhà xuất bản, và tác giả");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("CategoryIds", CategoryIds);
      formData.append("PublisherId", PublisherId);
      formData.append("AuthorId", AuthorId);
      try {
        console.log("CategoryIds", CategoryIds);
        dispatch(handleCreateProduct(formData)).then((res) => {
          console.log("dataa", res);

          toast.success("Thêm sản phẩm thành công");
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
          <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-2">
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
              <div className="col-2">
                <div className="mb-3">
                  <label className="form-label">Giá:</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="mb-3">
                  <label className="form-label">Số lượng:</label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Mô tả:</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <img
                  width={"100%"}
                  src={
                    imageAvatar
                      ? imageAvatar
                      : "https://png.pngtree.com/png-vector/20190614/ourlarge/pngtree-cameraimagephotopicture-blue-icon-on-abstract-cloud-backgr-png-image_1475517.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Ảnh:</label>
                      <input
                        type="file"
                        onChange={(e) => selectImage(e)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Danh mục:</label>
                      {listCategory &&
                        listCategory.length > 0 &&
                        listCategory.map((item, index) => {
                          return (
                            <div key={index + 1}>
                              <input
                                type="checkbox"
                                id={`category-${item.id}`}
                                value={item.id}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setCategoryIds([
                                      ...CategoryIds,
                                      e.target.value,
                                    ]);
                                  } else {
                                    setCategoryIds(
                                      CategoryIds.filter(
                                        (id) => id !== e.target.value
                                      )
                                    );
                                  }
                                }}
                              />
                              <label htmlFor={`category-${item.id}`}>
                                {item.name}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Nhà xuất bản:</label>
                      <select
                        onChange={(e) => setPublisherId(e.target.value)}
                        className="form-select"
                      >
                        <option value={PublisherId}>Chọn nhà xuất bản</option>
                        {listPublisher &&
                          listPublisher.length > 0 &&
                          listPublisher.map((item, index) => {
                            return (
                              <option key={index + 1} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Tác giả:</label>
                      <select
                        onChange={(e) => setAuthorId(e.target.value)}
                        className="form-select"
                      >
                        <option value={AuthorId}>Chọn tác giả</option>
                        {listAuthor &&
                          listAuthor.length > 0 &&
                          listAuthor.map((item, index) => {
                            return (
                              <option key={index + 1} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
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

export default ModalAddProduct;
