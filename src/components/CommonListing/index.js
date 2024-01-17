"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";

// 3:45:15
// Common Listing Page
// This the page that we see in /product/listing/all-products
export default function CommonListing({ data }) {
  const router = useRouter();

  // 4:37:00
  // Always RELOAD this page
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {
            data && data.length
              ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
              : null
          }
        </div>
      </div>

      {/** 4:37:55 */}
      <Notification />
    </section>
  );
}
