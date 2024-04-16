import React from "react";

const StandoutProduct = () => {
  const products = [
    {
      img: "/img/product_mouse.jpg",
      title: "New wireless earbuds, compact and powerful",
      description:
        "The latest wireless in-ear headphones from Baseus, compact and powerful, stand out as one of the budget-friendly highlights.",
    },
    {
      img: "/img/product_mouse.jpg",
      title: "New wireless earbuds, compact and powerful",
      description:
        "The latest wireless in-ear headphones from Baseus, compact and powerful, stand out as one of the budget-friendly highlights.",
    },
  ];

  const renderedProducts = products.map((product, index) => {
    return (
      <div key={index} className="flex flex-col md:flex-row justify-center items-center gap-8">
        <img src={product.img} alt={product.img} className="w-full md:w-1/2" />
        <div className="px-10 w-full md:w-1/2">
          <h1 className="text-3xl mb-4">{product.title}</h1>
          <p className="text-slate-500 text-base leading-7 mb-4">
            {product.description}
          </p>
          <button className="px-7 py-3 bg-gray-900 text-white">
            Get it now!
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col px-4 lg:px-48 py-16 pb-20">{renderedProducts}</div>
  );
};

export default StandoutProduct;
