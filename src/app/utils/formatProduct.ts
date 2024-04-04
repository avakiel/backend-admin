import { Product } from "@prisma/client";
import { EditProduct } from "../components/FormProduct";

export function formatProduct(product: Product) {
  const result: EditProduct = {
    id: product.id.toString(),
    name: product.name,
    itemId: product.itemId,
    priceRegular: product.fullPrice.toString(),
    priceWithDiscount: product.price.toString(),
    color: product.color,
    screen: product.screen,
    year: product.year.toString(),
    image: product.images,
    categoryId: product.categoryId.toString(),
    capacity: product.capacity,
    ram: product.ram
  };

  return result;
};