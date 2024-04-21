import React, { useState } from "react";

const DropdownAddress = ({ onChange, options }) => {
  const [selectedOption, setSelectedOption] = useState();

  const handleSelectChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      value={selectedOption ? JSON.stringify(selectedOption) : ""}
      onChange={handleSelectChange}
      className="h-12 w-full md:min-w-40 lg:min-w-52 border rounded-md outline-none"
    >
      <option value="" disabled selected>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option.val} value={JSON.stringify(option)}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownAddress;
