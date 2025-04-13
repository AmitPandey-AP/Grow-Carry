import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: Object,
    default: {},
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  country: {
    type: Object,
    required: true,
  },
  phone: {
    type: Object,
    required: true,
  },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
