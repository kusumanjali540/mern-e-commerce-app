import React from "react";

const OrderItem = ({ order, index, onClick }) => {
  const handleOpenEditModal = (order) => {
    onClick(order);
  };

  return (
    <div
      key={index}
      className="w-full h-20 bg-slate-200 rounded-lg mb-4 flex flex-row justify-between pr-8"
    >
      <div className="w-3/4 flex flex-row">
        <div className="w-20 h-full bg-black border">
          {/* <img
            src={order.pictures[0]}
            alt="pictures"
            className="w-full h-full object-contain"
          /> */}
        </div>
        <div className="flex-1">{order.email}</div>
      </div>

      <div className="flex items-center">Last Name: {order.lastName}</div>
      <div className="flex items-center">Status: {order.status}</div>

      <div className="h-full flex items-center">
        <button
          onClick={() => handleOpenEditModal(order)}
          className="bg-black text-white px-4 py-4"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
