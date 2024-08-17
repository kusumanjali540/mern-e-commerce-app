import React, { useState } from "react";
import { useAddOrderMutation } from "../../../features";
import toast from "react-hot-toast";
import { TailSpin } from "react-loading-icons";
import { showErrorToast } from "../../../services/showErrorToast";

const AddOrderForm = () => {
  const [formData, setFormData] = useState({
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
    customer: "",
    status: "Pending",
  });

  const [addOrder, { isLoading, isError }] = useAddOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await addOrder(formData).unwrap();

      console.log(isLoading, isError);

      if (!isLoading && !isError) {
        console.log("I Toast?");
        toast.success("Add new order successfully!");
      }

      setFormData({
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
        customer: "",
        status: "Pending",
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  //Handle input change for add new variant form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer:</label>
        <input
          type="text"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Refunded">Refunded</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>Product ID:</label>
        <input type="text" name="productName" />
      </div>
      <div>
        <label>Variant:</label>
        <input type="text" name="variant" />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" name="quantity" />
      </div>
      <div>
        <button type="submit">Create Order</button>
      </div>
    </form>
  );
};

export default AddOrderForm;
