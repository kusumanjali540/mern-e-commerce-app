import React, { useEffect, useState } from "react";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshCart } from "../features";
import { useLazyFetchProductWithSelectedVariantQuery } from "../features/apis/productsApi";
import { showErrorToast } from "../services/showErrorToast";

const Cart = () => {
  const [cartItemsWithProducts, setCartItemsWithProducts] = useState([]);
  const dispatch = useDispatch();
  const [trigger, { isLoading, isError }] =
    useLazyFetchProductWithSelectedVariantQuery();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(refreshCart());
  }, [dispatch]);

  console.log("Reload");

  useEffect(() => {
    // Fetch product data for each cart item and update state
    const fetchProducts = async () => {
      try {
        const updatedCartItems = await Promise.all(
          cartItems.map(async (item) => {
            const product = await trigger(item).unwrap();
            return { ...item, product };
          })
        );
        setCartItemsWithProducts(updatedCartItems);
      } catch (error) {
        showErrorToast(error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems, trigger]);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="px-4 md:px-20 lg:px-48 py-8 w-full">
          <div className="flex flex-row justify-between mb-8">
            <div className="text-3xl lg:text-4xl">Your cart</div>
            <Link to="/products/all">
              <button className="underline text-slate-600">
                Continue shopping
              </button>
            </Link>
          </div>
          <div className="w-full">
            <table className="w-full border-separate border-spacing-y-6">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="text-start pb-4 text-xs font-normal opacity-85"
                  >
                    PRODUCT
                  </th>
                  <th className="text-start hidden md:block pb-4 text-xs font-normal opacity-85">
                    QUANTITY
                  </th>
                  <th className="pb-4 text-xs font-normal opacity-85">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {isError && (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Error has occured!
                    </td>
                  </tr>
                )}
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : cartItemsWithProducts.length > 0 ? (
                  cartItemsWithProducts.map((cartItem, index) => (
                    <CartItem key={index} cartItem={cartItem} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Trying to get products data...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-center items-end gap-y-2 border-t-2 py-8">
            <div className="text-xs">
              Taxes, discounts and shipping calculated at checkout
            </div>
            <Link to="/checkout">
              <button
                className={`bg-black text-white px-40 py-4 ${
                  cartItemsWithProducts.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={cartItemsWithProducts.length === 0}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-9">
          <h1 className="text-3xl lg:text-5xl">Your cart is empty</h1>
          <Link to="/products/all">
            <button className="bg-black text-white px-14 py-4">
              Continue shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
