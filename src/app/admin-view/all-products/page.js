import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";


// This is a server component.
// 3:54:58
export default async function AdminAllProducts() {

  const allAdminProducts = await getAllAdminProducts()
  // console.log(allAdminProducts);

  return <CommonListing data={allAdminProducts && allAdminProducts.data} />
}
