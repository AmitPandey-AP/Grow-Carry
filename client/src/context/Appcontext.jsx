import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState([]);

  // Fetch Seller Status

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch User Auth Status

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data?.user?.cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  // update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (quantity != 0) {
      setCartItems((cartItems) => {
        const newCart = { ...cartItems, [itemId]: quantity };
        return newCart;
      });
      const newCart = { ...cartItems, [itemId]: quantity };
      const { data } = await axios.post("/api/cart/update", {
        cartItems: newCart,
      });
      toast.success("Cart Updated");
    } else {
      toast.success("Removed from Cart ->");

      const newCart = { ...cartItems, [itemId]: 0 };
      if (newCart[itemId] == 0) delete newCart[itemId];
      const { data } = await axios.post("/api/cart/update", {
        cartItems: newCart,
      });
      setCartItems(newCart);
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((cartItems) => {
      const newCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
      if (newCart[itemId] == 0) delete newCart[itemId];
      return newCart;
    });

    toast.success("Removed from Cart");
  };

  // Get cart item count

  const getCartItemCount = () => {
    let totalCount = 0;
    for (const key in cartItems) {
      if (Object.prototype.hasOwnProperty.call(cartItems, key)) {
        const element = cartItems[key];
        totalCount += element;
      }
    }

    return totalCount;
  };

  const getCartItemAmount = () => {
    let totalAmount = 0;
    let arr = [];
    for (const key in cartItems) {
      arr.push(key);
    }
    products.forEach((obj) => {
      if (arr.includes(obj._id)) {
        totalAmount += obj.offerPrice * cartItems[obj._id];
      }
    });
    return Math.floor(totalAmount * 100) / 100;
  };

  // for fetching

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  // the state that are centralised
  const val = {
    axios,
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartItemCount,
    getCartItemAmount,
    fetchProducts,
    setCartItems,
  };
  return <AppContext.Provider value={val}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};

// useAppcontext se jo bhi value parameter ke andar jayega unka access mil jayega
