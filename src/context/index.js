"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

// 8:29:30
export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

// 9:34:17
// 10:34:32
// To protect route which Admins and Authenticated users can access.
const protectedRoutes = [
  "cart",
  "checkout",
  "account",
  "orders",
  "admin-view"
];

// 9:35:19
const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  // 2:34:18
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  // 2:19:13
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  // 4:23:09
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  // 6:08:40
  const [showCartModal, setShowCartModal] = useState(false);
  // 6:18:04
  const [cartItems, setCartItems] = useState([]);
  // 7:38:14
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });

  // 8:29:12
  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  // 9:46:10
  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  // 10:03:34
  const [orderDetails, setOrderDetails] = useState(null);
  // 10:46:31
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  const router = useRouter();
  const pathName = usePathname();


  // 2:24:00
  /* When a user login and redirected to Home page, isAuthUser becomes null. The login data needs to be persisted in the GlobalContext. Althourhg the user is authenticated, when the app is redirected to Home page, the state variable vanishes. In the context, whenever user will load Home page, we have to check, if the token is already registered in the cookies. If the token is already available, the user is authenticated.
  */
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      // 2:26:35
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      // 8:10:45
      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      setUser(userData);
      // 8:11:07
      setCartItems(getCartItems);

    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);


  // 9:35:26
  useEffect(() => {
    if (
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName) > -1
    )
      router.push("/login");
  }, [user, pathName]);


  // 9:39:21
  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);


  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user, // 2:19:51
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
