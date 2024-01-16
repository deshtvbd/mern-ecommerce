import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

// 4:51:22
export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
