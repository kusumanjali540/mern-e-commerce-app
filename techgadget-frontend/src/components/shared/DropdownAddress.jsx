import React, { useState, useEffect } from "react";

const DropdownAddress = ({ onChange, options, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Reset selectedOption when options or initialValue changes
    setSelectedOption(initialValue ? JSON.stringify(initialValue) : "");
  }, [options, initialValue]);

  const handleSelectChange = (event) => {
    const selectedValue = JSON.parse(event.target.value);
    setSelectedOption(event.target.value); // Update selectedOption to the new value
    onChange(selectedValue);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleSelectChange}
      className="h-12 w-full md:min-w-40 lg:min-w-52 border rounded-md outline-none"
    >
      <option value="" disabled={!selectedOption}>
        {initialValue ? initialValue : "Select an option"}
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