import React, { useState } from "react";
import Quantity from "../shared/Quantity";
import { AiOutlineDelete } from "react-icons/ai";
import { updateQuantityInCart } from "../../services/useLocalStorageService";
import { deleteCartItem } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import ResponsiveSquare from "../shared/ResponsiveSquare";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.quantity);

  console.log("Any here", cartItem.product.product);

  const handleDecreaseQuantity = () => {
    console.log("Descrease");

    if (quantity > 1) {
      updateQuantityInCart(
        cartItem.productId,
        cartItem.product.product.properties,
        -1
      );
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    console.log("Increase");
    updateQuantityInCart(
      cartItem.productId,
      cartItem.product.product.properties,
      1
    );
    setQuantity(quantity + 1);
  };

  const handleDeleteCartItem = () => {
    dispatch(
      deleteCartItem({
        productId: cartItem.productId,
        variantProperties: cartItem.product.product.properties,
      })
    );
  };

  return (
    <tr className="w-full h-full">
      <td className="w-1/4 h-fit md:w-1/6 lg:w-[12%] 2xl:w-1/12">
        <div className="min-w-28 min-h-28 md:w-full">
          <ResponsiveSquare
            src={cartItem.product.product.pictures[0]}
            alt={cartItem.product.product.name}
            width="100%"
          />
        </div>
      </td>
      <td className="w-2/3">
        <div className="px-4">
          {cartItem.product.product.name}
          <div>${cartItem.product.product.price}</div>
          <div className="flex flex-row gap-x-2">
            {Object.entries(cartItem.product.product.properties).map(
              ([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              )
            )}
          </div>
        </div>
        <div className="mobile block md:hidden">
          <div className="flex flex-row justify-start items-center gap-x-2 h-full px-4">
            <Quantity
              quantity={quantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
            />
            <button onClick={handleDeleteCartItem}>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-row justify-start items-center gap-x-2 h-full pr-4">
          <Quantity
            quantity={quantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
          <button onClick={handleDeleteCartItem}>
            <AiOutlineDelete />
          </button>
        </div>
      </td>
      <td className="">
        <div className="w-full h-full flex justify-center items-center">
          ${(cartItem.product.product.price * quantity).toFixed(2)}
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
