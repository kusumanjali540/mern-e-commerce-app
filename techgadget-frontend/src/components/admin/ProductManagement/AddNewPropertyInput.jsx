import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";


const AddNewPropertyInput = ({ addNewVariantProperty, variantIndex }) => {
  const [newVariantProperty, setNewVariantProperty] = useState({
    key: "",
    value: "",
  });

  const handleNewVariantPropertyChange = (e) => {
    const { name, value } = e.target;
    setNewVariantProperty((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    addNewVariantProperty(newVariantProperty, variantIndex);
    setNewVariantProperty({
      key: "",
      value: "",
    });
  };

  return (
    <div className="flex flex-row items-center">
      <div>
        <input
          type="text"
          name="key"
          value={newVariantProperty.key}
          placeholder="Key"
          onChange={handleNewVariantPropertyChange}
          className="border w-20 h-5 opacity-65"
        />
        <input
          type="text"
          name="value"
          value={newVariantProperty.value}
          placeholder="Value"
          onChange={handleNewVariantPropertyChange}
          className="border w-20 h-5 opacity-65"
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="px-1 bg-black h-5 text-white flex flex-row items-center gap-2"
      >
        <AiOutlinePlus /> Add
      </button>
    </div>
  );
};

export default AddNewPropertyInput;
