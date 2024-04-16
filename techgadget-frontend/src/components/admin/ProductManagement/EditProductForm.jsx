import React, { useEffect, useRef, useState } from "react";
import AddNewPropertyInput from "./AddNewPropertyInput";
import { AiOutlinePlus } from "react-icons/ai";
import {
  useEditProductMutation,
  useRemoveProductMutation,
} from "../../../features";
import { productObject2FormData } from "../../../services/helper";

const EditProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState(product);

  const [editProduct, { isLoading: editLoading, isError: editError }] =
    useEditProductMutation();

  const [removeProduct, { isLoading: removeLoading, isError: removeError }] =
    useRemoveProductMutation();
  const inputFileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform any action, such as submitting the data to your backend API

    const newFormData = productObject2FormData(formData);
    for (var pair of newFormData.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0] + ", File: " + pair[1].name);
      } else {
        console.log(pair[0] + ", " + pair[1]);
      }
    }

    // Reset the form after submission if needed
    try {
      const result = await editProduct({
        formData: newFormData,
        productId: formData._id,
      });

      console.log(result);

      setFormData({
        name: "",
        brand: "",
        description: "",
        category: "",
        variants: [{ properties: {}, price: "", quantity: "" }],
        pictures: [],
      });
      inputFileRef.current.value = null;
    } catch (err) {
      console.log(err);
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

  //Handle input change for variant
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  //Add new variant
  const addVariantRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      variants: [
        ...prevData.variants,
        { properties: {}, price: "", quantity: "" },
      ],
    }));
  };

  //Handle submit new property of a variant
  const addNewVariantProperty = (data, variantIndex) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].properties = {
      ...newVariants[variantIndex].properties,
      [data.key]: data.value,
    };
    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  const handleModifyPropertyValue = (variantIndex, keyProp, e) => {
    const { value } = e.target;
    const newVariants = [...formData.variants];

    const updatedProperties = {
      ...newVariants[variantIndex].properties,
      [keyProp]: value,
    };

    newVariants[variantIndex] = {
      ...newVariants[variantIndex],
      properties: updatedProperties,
    };

    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  const handlePicturesChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      pictures: [...event.target.files],
    }));
  };

  const handleDeleteProduct = async () => {
    console.log(product);
    const result = await removeProduct(product._id);
    console.log(result);
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
        onClick={handleDeleteProduct}
      >
        Delete this product
      </button>
      <h1 className="text-3xl">Product Form</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product's name"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter product's brand name"
            className="w-full h-10 border"
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full h-40 border"
          />
        </label>
        <br />
        <label>
          Variants:
          {formData.variants.map((variant, variantIndex) => (
            <div key={variantIndex}>
              <div className="w-full rounded-lg border-black border mb-4 px-2">
                {Object.keys(variant.properties).map((key, pairIndex) => (
                  <div key={pairIndex} className="flex flex-row pb-2">
                    <input type="text" value={key} placeholder="Key" disabled />
                    <input
                      type="text"
                      name="value"
                      value={variant.properties[key]}
                      placeholder="Value"
                      onChange={(e) =>
                        handleModifyPropertyValue(variantIndex, key, e)
                      }
                      className="border"
                    />
                  </div>
                ))}

                <AddNewPropertyInput
                  addNewVariantProperty={addNewVariantProperty}
                  variantIndex={variantIndex}
                />

                <div className="flex flex-row gap-4">
                  <div className="flex flex-row gap-4">
                    <label htmlFor="price">Price :</label>
                    <input
                      type="text"
                      name="price"
                      value={variant.price}
                      placeholder="Price"
                      onChange={(e) => handleVariantChange(variantIndex, e)}
                      className="border"
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <label htmlFor="quantity">Quantity in storage:</label>
                    <input
                      type="text"
                      name="quantity"
                      value={variant.quantity}
                      placeholder="Quantity"
                      onChange={(e) => handleVariantChange(variantIndex, e)}
                      className="border"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariantRow}
            className="px-2 bg-black text-white flex flex-row items-center gap-2"
          >
            <AiOutlinePlus /> Add Variant
          </button>
        </label>
        <br />
        <label>
          Pictures:
          <input
            type="file"
            name="pictures"
            multiple
            accept="image/*"
            ref={inputFileRef}
            onChange={handlePicturesChange}
          />
        </label>
        <br />
        <div className="w-full flex flex-col items-center py-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 h-10 px-2 bg-black text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
