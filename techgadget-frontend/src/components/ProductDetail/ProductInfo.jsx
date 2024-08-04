import React, { useEffect, useState } from "react";
import Canrousel from "../shared/Canrousel";
import Quantity from "../shared/Quantity";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVariant,
  addNewCartItem,
  closeModal,
  openModal,
} from "../../features";
import Variant from "./Variant";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import { findVariantByProperties } from "../../services/helper";
import toast from "react-hot-toast";
import ProductDescription from "./ProductDescription";

const ProductInfo = ({ product, error, isFetching }) => {
  const dispatch = useDispatch();

  const selectedVariant = useSelector((state) => state.selectedVariant);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isFetching) {
      dispatch(
        changeVariant({
          ...selectedVariant,
          properties: {
            ...selectedVariant.properties,
            ...product.variants[0].properties,
          },
          price: product.variants[0].price,
          storage: product.variants[0].quantity,
          index: 0,
        })
      );
    }
  }, [isFetching, product]);

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

  const handleVariantChange = (value) => {
    // Find the variant of the product matching with the selected variant
    const { foundVariant, index } = findVariantByProperties(
      product.variants,
      value
    );

    // No variant matched, mark it as out of stock
    if (!foundVariant) {
      dispatch(
        changeVariant({
          ...selectedVariant,
          properties: {
            ...value,
          },
          price: null,
          storage: 0,
          index: -1,
        })
      );
    } else { // Update the atributes of selected variant of the product
      dispatch(
        changeVariant({
          ...selectedVariant,
          properties: {
            ...value,
          },
          price: foundVariant.price,
          storage: foundVariant.quantity,
          index: index,
        })
      );
    }
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
                disabled={selectedVariant.storage === 0 ? true : false}
              />
            </div>

            <button
              className={`w-full h-14 mb-2 border ${
                selectedVariant.storage === 0
                  ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                  : "bg-white border-black hover:border-4"
              }`}
              onClick={handleAddToCart}
              disabled={selectedVariant.storage === 0}
            >
              Add to cart
            </button>
            <button
              className={`w-full h-14 mb-2 text-white ${
                selectedVariant.storage === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black hover:bg-slate-600"
              }`}
              onClick={() => console.log("Buy Now clicked")}
              disabled={selectedVariant.storage === 0}
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
