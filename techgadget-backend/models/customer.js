const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    required: function () {
      return (
        !this.oauthProviders || Object.keys(this.oauthProviders).length === 0
      );
    },
    default: "",
  },
  firstName: {
    type: String,
    required: true,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zipcode: {
    type: String,
    default: "",
  },
  oauthProviders: {
    type: Map,
    of: new Schema({
      providerId: { type: String, required: true },
      providerName: { type: String, required: true },
    }),
    default: {},
  },
});

module.exports = mongoose.model("Customer", customerSchema);
