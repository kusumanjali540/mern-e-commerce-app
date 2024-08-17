import React, { useState } from "react";
import { useAddCustomerMutation } from "../../../features";
import toast from "react-hot-toast";
import { TailSpin } from "react-loading-icons";
import { showErrorToast } from "../../../services/showErrorToast";

const AddCustomerForm = () => {
  const [formData, setFormData] = useState({
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

  const [addCustomer, { isLoading, isError }] = useAddCustomerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      await addCustomer(formData).unwrap();

      console.log(isLoading, isError);

      if (!isLoading && !isError) {
        console.log("I Toast?");
        toast.success("Add new customer successfully!");
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
          className="w-1/2 h-10 px-2 bg-black text-white flex flex-row justify-center items-center"
          onClick={handleSubmit}
        >
          {isLoading ? <TailSpin /> : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddCustomerForm;
