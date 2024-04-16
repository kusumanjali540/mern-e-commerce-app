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

  return undefined;
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

export {
  productObject2FormData,
  getUniqueVariants,
  compareTwoObj,
  findVariantByProperties,
  capitalizeWords,
};
