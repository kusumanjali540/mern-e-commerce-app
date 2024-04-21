import React from 'react';

const CheckoutSuccess = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Checkout Success</h1>
        <p>Your order has been successfully processed.</p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;