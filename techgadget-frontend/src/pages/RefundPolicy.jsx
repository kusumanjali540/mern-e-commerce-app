import React from "react";
import { STORE_EMAIL } from "../utils/constants";

const RefundPolicy = () => {
  return (
    <div className="w-full px-4 lg:px-48 py-8">
      <div className="mb-16">
        <h1 className="text-3xl">Refund Policy</h1>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          At Tech Gadget KV, we are committed to ensuring your satisfaction with our products. If you are not completely satisfied with your purchase, we offer a comprehensive refund policy to address your concerns. This Refund Policy outlines the conditions under which you may return products and receive a refund.
        </p>
        <p>
          You have 30 days from the date of purchase to return an item for a full refund. To be eligible for a return, the item must be in its original condition, unused, and in the original packaging. Proof of purchase, such as a receipt or order confirmation, is required to process your return.
        </p>
        <p>
          To initiate a return, please contact our customer service team at khaqt268@gmail.com. Provide your order number, details of the item you wish to return, and the reason for the return. Our team will provide you with a Return Merchandise Authorization (RMA) number and instructions on how to send the item back to us.
        </p>
        <p>
          Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within a certain amount of days, depending on your payment provider’s policies.
        </p>
        <p>
          Please note that shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. Additionally, certain items may be exempt from being returned, such as perishable goods, custom products, and items marked as final sale.
        </p>
        <p>
          In the event that you receive a defective or damaged product, please contact us immediately at khaqt268@gmail.com with details of the defect or damage. We will arrange for a replacement or refund as quickly as possible, including covering any return shipping costs for defective items.
        </p>
        <p>
          If you have any questions regarding our refund policy, please contact us at:
          <br />
          <br />
          Email: {STORE_EMAIL}
          <br />
          <br />
          Tech Gadget KV
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
