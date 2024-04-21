const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      // Only require password if status is "SignedUp"
      return this.status === "SignedUp";
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["SignedUp", "Guest"],
  },
});

module.exports = mongoose.model("Customer", customerSchema);
