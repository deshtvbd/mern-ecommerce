"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

// 6:37:05
export default function Cart() {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader, // 6:53:02
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    // 6:53:11
    setPageLevelLoader(true);

    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
            ...item,
            productID: {
              ...item.productID,
              price:
                item.productID.onSale === "yes"
                  ? parseInt(
                    (
                      item.productID.price -
                      item.productID.price * (item.productID.priceDrop / 100)
                    ).toFixed(2)
                  )
                  : item.productID.price,
            },
          }))
          : [];

      setCartItems(updatedData);
      // 6:53:16
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  // 6:53:58
  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  // 6:56:40
  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
