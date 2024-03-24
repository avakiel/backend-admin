import { Product } from "@prisma/client";
import { EditProduct } from "../components/FormProduct";

export function formatProduct(product: Product) {
  const result: EditProduct = {
    name: product.name,
    priceRegular: product.fullPrice.toString(),
    priceWithDiscount: product.price.toString(),
    color: product.color,
    screen: product.screen,
    year: product.year.toString(),
    image: product.image,
    categoryId: product.categoryId.toString(),
    capacity: product.capacity,
    ram: product.ram
  };

  return result;
};