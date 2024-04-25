import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { useFetchAllProductsQuery } from "../../features";
import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";

const Search = ({ setIsOpen, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { data, error, isFetching } = useFetchAllProductsQuery();
  const [searchData, setSearchData] = useState([]);
  
  useEffect(() => {
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
        <div className="bg-white border-t-2">
          <div className="py-2">
            <div className="px-4">
              <h1>Products</h1>
              <div className="flex flex-col gap-1">
                {searchData.length > 0
                  ? searchData.map((item, index) => (
                      <Link key={index} to={`/product/${item._id}`} onClick={handleCloseSearch}>
                        <SearchItem item={item} />
                      </Link>
                    ))
                  : "Not found!"}
              </div>
            </div>

            {/* <button className="w-full px-4 pt-2 flex flex-row justify-between items-center border-t-2">
              Search for "{searchTerm}" <AiOutlineArrowRight />
            </button> */}
          </div>
        </div>
      )}

      <div className="h-screen bg-black opacity-50">{""}</div>
    </div>
  );
};

export default Search;
