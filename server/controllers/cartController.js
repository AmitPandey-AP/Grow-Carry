// Update User Cartdata /api/vart/update
import userModel from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;
    const update = await userModel.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
