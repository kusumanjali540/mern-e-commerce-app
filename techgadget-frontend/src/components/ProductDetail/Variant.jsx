import React, { useState } from "react";
import { getUniqueVariants } from "../../services/helper";

const Variant = ({ variants, onVariantChange }) => {
  const types = getUniqueVariants(variants);
  const [selectedVariants, setSelectedVariants] = useState(
    variants[0].properties
  );
  
  const handleVariantChange = (key, value) => {
    onVariantChange({
      ...selectedVariants,
      [key]: value,
    });

    setSelectedVariants({
      ...selectedVariants,
      [key]: value,
    });
  };

  const options = Object.entries(types).map(([key, value]) => (
    <div key={key}>
      <div className="pb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
      <div className="flex flex-row gap-x-4">
        {Array.from(value).map((attVal, index) => (
          <button
            key={index}
            className={`${
              attVal === selectedVariants[key]
                ? "bg-gray-500 text-white"
                : "border border-black"
            }
            } min-w-20 min-h-10 px-2 py-2 rounded-full`}
            onClick={() => handleVariantChange(key, attVal)}
          >
            {attVal}
          </button>
        ))}
      </div>
    </div>
  ));

  return <div className="mb-6">{options}</div>;
};

export default Variant;
