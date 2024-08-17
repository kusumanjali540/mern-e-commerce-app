import React, { useState } from "react";

const SimpleInput = ({
  id,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="h-16 relative">
      <label
        htmlFor={name}
        className="absolute top-2 left-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        placeholder={placeholder ? placeholder : ""}
        name={name}
        type={type}
        id={id}
        className="mt-1 block w-full h-full p-2 pt-8 sm:text-sm border-[1px] border-black"
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default SimpleInput;
