// Add Address : /api/address/add
import addressModel from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;
    await addressModel.create({ ...address, userId });
    res.json({ success: true, message: "Address added succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add Address : /api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await addressModel.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
