import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

// 4:55:27
export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("women");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
