import React, { useState } from "react";
import AddNewPropertyInput from "./AddNewPropertyInput";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddProductMutation } from "../../../features";
import { productObject2FormData } from "../../../services/helper";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    variants: [{ properties: {}, price: "", quantity: "" }],
    pictures: [],
  });

  console.log(formData);

  const [addProduct, { isLoading, isError }] = useAddProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // const newFormData = productObject2FormData(formData);
    // for (var pair of newFormData.entries()) {
    //   if (pair[1] instanceof File) {
    //     console.log(pair[0] + ", File: " + pair[1].name);
    //   } else {
    //     console.log(pair[0] + ", " + pair[1]);
    //   }
    // }

    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("brand", formData.brand);
    newFormData.append("description", formData.description);
    newFormData.append("category", formData.category);
    newFormData.append("variants", JSON.stringify(formData.variants));
    formData.pictures.forEach((item, index) => {
      newFormData.append("pictures", item);
    });

    for (var pair of newFormData.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0] + ", File: " + pair[1].name);
      } else {
        console.log(pair[0] + ", " + pair[1]);
      }
    }

    // Reset the form after submission if needed
    try {
      const result = await addProduct(newFormData);
      
      console.log(result);

      setFormData({
        name: "",
        brand: "",
        description: "",
        variants: [{ properties: {}, price: "", quantity: "" }],
        pictures: [],
      });
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

  //Handle add new property of a variant
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

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-300">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          required
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
          required
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
          required
          placeholder="Enter description"
          className="w-full h-40 border"
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="Enter product's category name"
          className="w-full h-10 border"
        />
      </label>
      <br />
      <label>
        Variants:
        {formData.variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <div className="w-full rounded-lg border-black border mb-4 px-2">
              {Object.keys(variant.properties).map((key, pairIndex) => (
                <div key={pairIndex} className="flex flex-row pb-2 gap-2">
                  ({pairIndex})
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

              <div className="flex flex-row gap-4 mt-2">
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
      <label className="flex flex-row gap-4 items-center">
        Pictures:
        <input
          type="file"
          name="pictures"
          required
          multiple
          accept="image/*"
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
          Add
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
