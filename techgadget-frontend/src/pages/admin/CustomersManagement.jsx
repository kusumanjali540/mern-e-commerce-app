import React, { useState } from "react";
import { useFetchCustomersQuery } from "../../features";
import EditCustomerForm from "../../components/admin/CustomerManagement/EditCustomerForm";
import Modal from "react-modal";
import CustomerItem from "../../components/admin/CustomerManagement/CustomerItem";
import { TailSpin } from "react-loading-icons";
import AddCustomerForm from "../../components/admin/CustomerManagement/AddCustomerForm";

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

const CustomersManagement = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [page, setPage] = useState(1);
  const [editedCustomer, setEditedCustomer] = useState();
  const { data, error, isFetching } = useFetchCustomersQuery({
    page: page,
    perPage: 4,
  });

  //Handle switch page for customer list
  const handleSwitchPage = (value) => {
    setPage(value);
  };

  const handleOpenEditModal = (customer) => {
    setEditedCustomer(customer);
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
    content = data.customers.map((customer, index) => {
      return (
        <CustomerItem key={index} customer={customer} onClick={handleOpenEditModal} />
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
          <EditCustomerForm customer={editedCustomer} onClose={handleCloseEditModal} />
        </div>
      </Modal>
      <h2>Customers Management</h2>
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
        <h1>Add new customer</h1>
        <AddCustomerForm />
      </div>
    </div>
  );
};

export default CustomersManagement;
