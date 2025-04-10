import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontext.jsx";
export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartItemCount,
    getCartItemAmount,
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length) {
      navigate("/products");
    }
  }, [searchQuery]);
  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink
        to="/"
        className="flex gap-2 tracking-tighter"
        onClick={() => {
          setOpen(false);
        }}
      >
        <img className="h-9" src="/favicon.svg" alt="Grow-Carry" />
        <h1 className=" font-semibold text-green-500 text-2xl">Grow-Carry</h1>
      </NavLink>
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products"> All Product</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80 "
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartItemCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 px-2 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => {
                  navigate("/myOrders");
                }}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80 "
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartItemCount()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => {
              setOpen(false);
            }}
          >
            All Product
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => {
              setOpen(false);
            }}
          >
            Contact
          </NavLink>

          {user && (
            <NavLink
              to="/myOrders"
              onClick={() => {
                setOpen(false);
              }}
            >
              My Order
            </NavLink>
          )}

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
