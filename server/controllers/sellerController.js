// seller login : /api/seller/login
import jwt from "jsonwebtoken";

export const sellerLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true, // httpOnly -> prevent javascript to access cookie
        secure: process.env.NODE_ENV === "production", // use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //secure from CSRF production
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
      });
      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: error.message });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// seller auth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// seller logout : /api/seller/logout

export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true, // httpOnly -> prevent javascript to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //secure from CSRF production
    });
    return res.json({ success: true, message: "Logout Succesfully" });
  } catch {
    return res.json({ success: false, message: error.message });
  }
};
