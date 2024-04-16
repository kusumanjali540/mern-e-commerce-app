import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useEditCustomerMutation,
  useRemoveCustomerMutation,
} from "../../../features";

const EditCustomerForm = ({ customer, onClose }) => {
  const [formData, setFormData] = useState(customer);

  console.log(customer);

  const [editCustomer, { isLoading: editLoading, isError: editError }] =
    useEditCustomerMutation();

  const [removeCustomer, { isLoading: removeLoading, isError: removeError }] =
    useRemoveCustomerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await editCustomer({
        formData: formData,
        customerId: customer._id,
      }).unwrap();

      if (!editLoading && !editError) {
        console.log("I Toast?");
        toast.success("Edit customer successfully!");
      }

      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        status: "SignedUp",
      });
    } catch (err) {
      toast.error(err.data.message);
      err.data.data?.forEach((msg) => {
        toast.error(msg);
      });
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

  const handleDeleteCustomer = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await removeCustomer(customer._id).unwrap();

      if (!editLoading && !editError) {
        console.log("I Toast?");
        toast.success("Delete customer successfully!");
      }

      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        status: "SignedUp",
      });
    } catch (err) {
      toast.error(err.data.message);
      err.data.data?.forEach((msg) => {
        toast.error(msg);
      });
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute top-0 right-4 bg-red-400 px-2"
        onClick={onClose}
      >
        X
      </button>
      <button
        className="absolute top-0 right-28 bg-red-400 px-2"
        onClick={handleDeleteCustomer}
      >
        Delete this customer
      </button>
      <h1 className="text-3xl">Customer Form</h1>

      <form onSubmit={handleSubmit} className="p-4 bg-slate-300">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            required={formData.status === "SignedUp"}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Enter zipcode"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full h-10 border"
          >
            <option value="SignedUp">Signed Up</option>
            <option value="Guest">Guest</option>
          </select>
        </label>
        <br />
        <div className="w-full flex flex-col items-center py-8">
          <button
            type="submit"
            className="w-1/2 h-10 px-2 bg-black text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerForm;
