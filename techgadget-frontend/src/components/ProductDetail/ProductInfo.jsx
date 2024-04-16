import React, { useEffect, useState } from "react";
import Canrousel from "../shared/Canrousel";
import Quantity from "../shared/Quantity";
import { useDispatch } from "react-redux";
import { addNewCartItem, closeModal, openModal } from "../../features";
import Variant from "./Variant";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import { findVariantByProperties } from "../../services/helper";
import toast from "react-hot-toast";
import ProductDescription from "./ProductDescription";

const ProductInfo = ({ product, error, isFetching }) => {
  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState({
    properties: {},
    price: null,
    storage: 1,
    index: -1,
  });

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isFetching) {
      setSelectedVariant({
        ...selectedVariant,
        properties: {
          ...selectedVariant.properties,
          ...product.variants[0].properties,
        },
        price: product.variants[0].price,
        storage: product.variants[0].quantity,
        index: 0,
      });
    }
  }, [isFetching, product, selectedVariant]);

  console.log(selectedVariant);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (selectedVariant.index === -1) {
      toast.error("Out of stock!");
      return;
    }

    const newCartItem = {
      productId: product._id,
      variant: selectedVariant.index,
      quantity: quantity,
      timestamp: Date.now(),
    };

    // Add to local storage
    dispatch(addNewCartItem(newCartItem));

    // Close modal if it's already open
    dispatch(closeModal());

    setTimeout(() => {
      // Pop up add to cart notification
      dispatch(openModal({ ...product, variant: newCartItem.variant }));
    }, 200);
  };

  console.log(selectedVariant);

  const handleVariantChange = (value) => {
    const { foundVariant, index } = findVariantByProperties(
      product.variants,
      value
    );

    console.log(foundVariant);

    if (!foundVariant) {
      setSelectedVariant({
        ...selectedVariant,
        properties: {
          ...value,
        },
        price: null,
        storage: 0,
        index: -1,
      });
    }

    setSelectedVariant({
      ...selectedVariant,
      properties: {
        ...value,
      },
      price: foundVariant.price,
      storage: foundVariant.quantity,
      index: index,
    });

    console.log(selectedVariant);
  };

  let content;

  if (isFetching) {
    content = (
      <div className="flex flex-col w-full h-[50vh] justify-center items-center">
        <TailSpin
          stroke="black"
          strokeOpacity={0.25}
          speed={1.5}
          width="4rem"
          height="4rem"
        />
        Loading...
      </div>
    );
  } else if (error || !product) {
    content = (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        Product not found!
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col px-4 w-full gap-4">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Canrousel slides={product.pictures} className="md:flex-1" />
          <div className="md:flex-1">
            <div className="mt-4 text-xs">Tech Gadget KV</div>
            <div className="text-4xl font-medium">{product.name}</div>
            <div
              className="my-4"
              style={
                error
                  ? {
                      color: "red",
                    }
                  : {}
              }
            >
              {selectedVariant.price
                ? `$ ${selectedVariant.price} USD`
                : "Out of stock"}
            </div>
            <Variant
              variants={product.variants}
              onVariantChange={handleVariantChange}
            />
            <div className="mb-6">
              <div className="pb-2">Quantity</div>
              <Quantity
                quantity={quantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
              />
            </div>

            <button
              className="w-full h-14 bg-white border border-black hover:border-4 mb-2"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className="w-full h-14 bg-black text-white hover:bg-slate-600 mb-2"
              onClick={() => console.log("Buy Now clicked")}
            >
              Buy it now
            </button>
          </div>
        </div>
        <ProductDescription product={product} />
      </div>
    );
  }

  return <div className="flex flex-col items-center gap-8">{content}</div>;
};

export default ProductInfo;
