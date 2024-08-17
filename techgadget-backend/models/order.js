const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        variant: {
          properties: { type: Map, of: String, required: true },
          price: { type: Number, required: true },
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Refunded", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

// Method to calculate total quantity and price
orderSchema.methods.calculateTotals = function () {
  this.totalQuantity = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.quantity * item.variant.price,
    0
  );

  console.log("Calculated totals:", {
    totalQuantity: this.totalQuantity,
    totalPrice: this.totalPrice,
  });
};

// Pre-save hook to automatically calculate totals before saving
orderSchema.pre("validate", function (next) {
  this.calculateTotals();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
