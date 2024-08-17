import React from "react";

const SearchItem = ({item}) => {
  console.log(item);
  
  return (
    <div className="flex flex-row items-center border-t-2">
      <div>
        <img
          src={item.pictures[0]}
          alt={item.name}
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="flex-1">{item.name}</div>
    </div>
  );
};

export default SearchItem;
