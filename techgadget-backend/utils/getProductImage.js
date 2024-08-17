const { getObjectSignedUrl } = require("../utils/s3FileUpload");

async function fetchProductsWithImages(products) {
  // Get imageUrl from s3 bucket
  await Promise.all(
    products.map(async (product) => {
      // Map over each picture in the product
      product.pictures = await Promise.all(
        product.pictures.map(async (picture) => {
          const imageUrl = await getObjectSignedUrl(picture);
          return imageUrl;
        })
      );
    })
  );
  return products;
}

module.exports = {
  fetchProductsWithImages,
};
