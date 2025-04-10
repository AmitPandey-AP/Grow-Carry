import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState([]);
  const fetchProducts = () => {
    setProducts(dummyProducts);
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
  const updateCartItem = (itemId, quantity) => {
    let cond = false;
    setCartItems((cartItems) => {
      const newCart = { ...cartItems, [itemId]: quantity };
      if (newCart[itemId] == 0) {
        delete newCart[itemId];
        cond = true;
      }
      return newCart;
    });
    if (!cond) toast.success("Cart Updated");
    else toast.success("Removed from Cart");
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
    for (const [key, value] of Object.entries(cartItems)) {
      totalCount += value;
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const val = {
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
  };
  return <AppContext.Provider value={val}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};

// useAppcontext se jo bhi value parameter ke andar jayega unka access mil jayega
