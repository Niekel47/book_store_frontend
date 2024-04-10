import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllAuthor,
  getAllPublisher,
  handleUpdateProduct,
} from "../../redux/slice/admin/productSlice.js";
import { UrlImage } from "../../../url.js";

const ModalEditProduct = (props) => {
  const URL_IMAGE = UrlImage();
  const { showModalEdit, handleCloseEdit, productEdit } = props;
  const [image, setImage] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [CategoryIds, setCategoryIds] = useState("");
  const [AuthorId, setAuthorId] = useState("");
  const [PublisherId, setPublisherId] = useState("");
  const [description, setDescription] = useState("");

  const { listCategory, listPublisher, listAuthor } = useSelector(
    (state) => state.admin.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllAuthor());
    dispatch(getAllPublisher());
    setProductEdit();
    if (productEdit) {
      setProductEdit();
    }
  }, [showModalEdit]);

  const setProductEdit = () => {
    setName(productEdit.name || "");
    setPrice(productEdit.price || "");
    setQuantity(productEdit.quantity || "");
    setAuthorId(productEdit.AuthorId || "");
    setCategoryIds("");
    setPublisherId(productEdit.PublisherId || "");
    setDescription(productEdit.description || "");
    setImageAvatar(null);
    setImage(null);
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
    if (!quantity) {
      toast.error("Vui lòng nhập số lượng");
      return false;
    }
    if (!description) {
      toast.error("Vui lòng điền mô tả");
      return false;
    }
    if (isNaN(quantity)) {
      toast.error("Vui lòng nhập đúng số lượng");
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
  const submitEdit = async () => {
    let check = isValidAdd();
    if (check === true) {
      const formData = new FormData();
      formData.append("product_id", productEdit.id);
      formData.append("name", name);
      if (!image) {
        formData.append("image", productEdit.image);
      } else {
        formData.append("image", image);
      }
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("CategoryIds", CategoryIds);
      formData.append("AuthorId", AuthorId);
      formData.append("PublisherId", PublisherId);
      formData.append("description", description);
      console.log("CategoryIds", CategoryIds);
      try {
        dispatch(
          handleUpdateProduct({ product_id: productEdit.id, formData })
        ).then((res) => {
          console.log("res.payload", res);
          toast.success("Sửa thành công");
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <Modal size="xl" show={showModalEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>SỬA SẢN PHẨM</Modal.Title>
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
            onClick={() => submitEdit()}
            style={{ width: "150px" }}
            variant="primary"
            type="button"
          >
            SỬA
          </Button>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={handleCloseEdit}
          >
            ĐÓNG
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditProduct;
