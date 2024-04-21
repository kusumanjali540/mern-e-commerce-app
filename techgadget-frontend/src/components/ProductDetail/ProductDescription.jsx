import React from "react";
import Markdown from "markdown-to-jsx";

const ProductDescription = React.memo(
  ({ product }) => {
    const markDownText = product.description;

    return (
      <div className="my-16">
        <h1 className="text-2xl mb-4">Description</h1>
        <div className="prose">
          <Markdown>{markDownText}</Markdown>
        </div>
      </div>
    );
  },
  (preProps, nextProps) => {
    return preProps.description === nextProps.description;
  }
);

export default ProductDescription;
