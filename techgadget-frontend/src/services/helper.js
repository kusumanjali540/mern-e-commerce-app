// Find all unique value of properties in a product, in order to initializing the options for choosing variants of the product
const getUniqueVariants = (variants) => {
  const objToReturn = {};

  // Create array for each type of variants
  for (const key in variants[0].properties) {
    const newArray = new Set();
    objToReturn[key] = newArray;
  }

  // Add option for variants
  variants.forEach((obj) => {
    const { properties } = obj;
    for (const key in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key)) {
        const value = properties[key];
        objToReturn[key].add(value);
      }
    }
  });

  return objToReturn;
};

// Get the information of the selected variants in the variants array of the product
const findVariantByProperties = (variants, properties) => {
  const index = variants.findIndex((variant) => {
    // Find the variant with the properties equal to the provided properties object
    return Object.keys(properties).every(
      (key) => variant.properties[key] === properties[key]
    );
  });

  // If index is not -1, variant is found
  if (index !== -1) {
    const foundVariant = variants[index];
    return { foundVariant, index };
  }

  return {undefined, index};
};

const productObject2FormData = (obj) => {
  const formData = new FormData();

  const traverse = (obj, parentKey = "") => {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const arrayKey = `${fullKey}[${index}]`;
            if (item instanceof File) {
              formData.append(key, item);
            } else if (typeof item === "object" && item !== null) {
              traverse(item, arrayKey);
            } else {
              formData.append(arrayKey, item);
            }
          });
        } else if (typeof value === "object" && value !== null) {
          traverse(value, fullKey);
        } else {
          formData.append(fullKey, value);
        }
      }
    }
  };

  traverse(obj);
  return formData;
};

const compareTwoObj = (obj1, obj2) => {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if the values of corresponding keys are equal
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // Objects are equal
  return true;
};

const capitalizeWords = (str) => {
  return str.replace(
    /(^|\s)([a-z])/g,
    (_, whitespace, char) => whitespace + char.toUpperCase()
  );
};

//Get the product, the quantity and the index of selected variant to calculate the totalPrice of a cart-item product
const calculateTotalPriceOfCartItem = (productDetail) => {
  const { product, variant, quantity } = productDetail;
  if (
    product &&
    product.variants &&
    variant >= 0 &&
    variant < product.variants.length &&
    quantity > 0
  ) {
    const selectedVariant = product.variants[variant];
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price * quantity;
    }
  }
  return null;
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  console.log(dLon);
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  console.log(a);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  console.log(c); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Helper function to calculate the shipping fee based on the distance between two locations
const calculateShippingFee = (lat1, lon1) => {
  const lat2 = 10.847931842960001;
  const lon2 = 106.75900795023855;

  console.log(lat1, lon1);
  if (!lat1 || !lon1) {
    return null;
  }
  // Calculate the distance between the two locations
  const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  console.log(distance);
  // Calculate the shipping fee based on the distance (assuming 1km = 0.1USD)
  const shippingFee = distance * 0.1;
  return shippingFee.toFixed(2);
};

export {
  productObject2FormData,
  getUniqueVariants,
  compareTwoObj,
  findVariantByProperties,
  capitalizeWords,
  calculateTotalPriceOfCartItem,
  calculateShippingFee,
};
