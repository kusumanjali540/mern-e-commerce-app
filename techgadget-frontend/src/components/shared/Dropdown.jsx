import React, { useState } from "react";

const Dropdown = ({ onChange, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleSelectChange}
      className="outline-none"
    >
      {options.map((option) => (
        <option key={option.val} value={option.val}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
