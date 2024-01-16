import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

// 5:05:44
export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData, "sangam");

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}
