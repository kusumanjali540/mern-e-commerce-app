import _ from "lodash";

export const setCartItemsWithTimestamps = (cartItems) => {
  localStorage.setItem("cartData", JSON.stringify(cartItems));
};

export const getCartItemsWithTimestamps = () => {
  const cartData = localStorage.getItem("cartData");
  let cartItems = cartData ? JSON.parse(cartData) : [];

  const currentTime = Date.now();

  // Filter out items with expired timestamps (older than a week)
  cartItems = cartItems.filter((item) => {
    const timeDifference = currentTime - item.timestamp;
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    return timeDifference <= oneWeekInMillis;
  });

  // Save the filtered cart items back to local storage / Delete expired cart items
  setCartItemsWithTimestamps(cartItems);

  return cartItems;
};

export const addToCart = (newCartItem) => {
  const cartItemsWithTimestamps = getCartItemsWithTimestamps();

  const existingCartItemIndex = cartItemsWithTimestamps.findIndex(
    (item) =>
      item.productId === newCartItem.productId &&
      _.isEqual(item.variantProperties, newCartItem.variantProperties)
  );

  console.log(existingCartItemIndex);

  // If the product is already in the cart, update its quantity
  if (existingCartItemIndex !== -1) {
    console.log(cartItemsWithTimestamps[existingCartItemIndex]);
    cartItemsWithTimestamps[existingCartItemIndex].quantity +=
      newCartItem.quantity;
    cartItemsWithTimestamps[existingCartItemIndex].timestamp = Date.now();
  } else {
    cartItemsWithTimestamps.push(newCartItem);
  }

  setCartItemsWithTimestamps(cartItemsWithTimestamps);

  console.log(getCartItemsWithTimestamps());
};

export const deleteFromCart = (productId, variantProperties) => {
  const cartItemsWithTimestamps = getCartItemsWithTimestamps();

  const itemIndexToRemove = cartItemsWithTimestamps.findIndex(
    (item) =>
      item.productId === productId &&
      _.isEqual(item.variantProperties, variantProperties)
  );

  if (itemIndexToRemove !== -1) {
    cartItemsWithTimestamps.splice(itemIndexToRemove, 1);
    setCartItemsWithTimestamps(cartItemsWithTimestamps);
  }

  return getCartItemsWithTimestamps();
};

export const emptyCart = () => {
  localStorage.removeItem("cartData");
};

export const updateQuantityInCart = (
  productId,
  variantProperties,
  quantityChange
) => {
  const cartItemsWithTimestamps = getCartItemsWithTimestamps();

  const itemToUpdateIndex = cartItemsWithTimestamps.findIndex(
    (item) =>
      item.productId === productId &&
      _.isEqual(item.variantProperties, variantProperties)
  );

  if (itemToUpdateIndex !== -1) {
    cartItemsWithTimestamps[itemToUpdateIndex].quantity += quantityChange;

    if (cartItemsWithTimestamps[itemToUpdateIndex].quantity < 1) {
      cartItemsWithTimestamps[itemToUpdateIndex].quantity = 1;
    }

    setCartItemsWithTimestamps(cartItemsWithTimestamps);
    console.log(getCartItemsWithTimestamps());
  }
};
