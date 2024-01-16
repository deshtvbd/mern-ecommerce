import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

// 4:56:12
export default async function KidsAllProducts() {
  const getAllProducts = await productByCategory("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
