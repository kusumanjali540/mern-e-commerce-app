import React, { useState } from "react";
import { useFetchProductsQuery } from "../../features";
import EditProductForm from "../../components/admin/ProductManagement/EditProductForm";
import Modal from "react-modal";
import ProductItem from "../../components/admin/ProductManagement/ProductItem";
import { TailSpin } from "react-loading-icons";
import AddProductForm from "../../components/admin/ProductManagement/AddProductForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "75%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ProductsManagement = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const { data, error, isFetching } = useFetchProductsQuery({
    page: page,
    perPage: 4,
  });

  //Handle switch page for product list
  const handleSwitchPage = (value) => {
    setPage(value);
  };

  const handleOpenEditModal = (product) => {
    setEditedProduct(product);
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
  };

  let content;
  if (isFetching) {
    content = (
      <div className="w-full h-80 flex justify-center items-center">
        <TailSpin
          stroke="black"
          strokeOpacity={0.25}
          speed={1.5}
          width="4rem"
          height="4rem"
        />
      </div>
    );
  } else if (error) {
    content = <div>Error: {error.error}</div>;
  } else {
    content = data.products.map((product, index) => {
      return (
        <ProductItem
          key={index}
          product={product}
          onClick={handleOpenEditModal}
        />
      );
    });
  }

  return (
    <div className="px-20">
      <Modal
        isOpen={isOpenEditModal}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full h-80">
          <EditProductForm product={editedProduct} onClose={handleCloseEditModal} />
        </div>
      </Modal>
      <h2>Products Management</h2>
      <div>{content}</div>
      <div className="flex flex-row justify-center gap-4">
        {data
          ? [...Array(Math.ceil(data.totalItems / 4))].map((_, index) => (
              <button
                key={index}
                onClick={() => handleSwitchPage(index + 1)}
                className={` text-white p-2 ${
                  page === index + 1 ? "bg-black" : "bg-slate-600"
                }`}
              >
                {index + 1}
              </button>
            ))
          : ""}
      </div>
      <div>
        <h1>Add new product</h1>
        <AddProductForm />
      </div>
    </div>
  );
};

export default ProductsManagement;
