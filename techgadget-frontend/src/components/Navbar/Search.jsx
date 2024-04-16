import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { useFetchProductQuery, useFetchProductsQuery } from "../../features";

const Search = ({ setIsOpen, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data, error, isFetching } = useFetchProductsQuery();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    console.log(searchData);
    setSearchData(() => {
      if (data) {
        return data.products.filter((product) => {
          return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
      } else {
        return [];
      }
    });
  }, [searchTerm, data]);

  const handleCloseSearch = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearClick = () => {
    setSearchTerm("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`absolute block top-0 left-0 w-full min-h-[18vh] z-[101] transition-all ${className}`}
    >
      <div className="w-full h-[18vh] bg-white flex flex-row justify-center items-center px-4">
        <div
          className={`flex flex-row justify-center items-center border flex-1 h-[30%] ${
            isFocused ? "border-black" : "border-gray-300"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="flex-grow outline-none px-4"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button
            onClick={handleClearClick}
            className={`text-gray-500 ${
              !searchTerm && "opacity-0 hover:cursor-default"
            } `}
          >
            <AiOutlineClose />
          </button>
          <button className={`text-gray-500`}>
            <AiOutlineSearch className="text-2xl" />
          </button>
        </div>

        <button
          onClick={handleCloseSearch}
          className="flex justify-center items-center p-2"
        >
          <AiOutlineClose />
        </button>
      </div>
      {searchTerm && (
        <div>
          <h1>Products</h1>
          {searchData.length > 0
            ? searchData.map((item, index) => (
                <div key={index}>{/* Render each item here */}</div>
              ))
            : "Not found!"}
          <button className="w-full p-2 flex flex-row justify-between items-center">
            Search for "{searchTerm}" <AiOutlineArrowRight />
          </button>
        </div>
      )}

      <div className="h-screen bg-black opacity-50">{""}</div>
    </div>
  );
};

export default Search;
