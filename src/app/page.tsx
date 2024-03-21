import ProductsTable from "./components/ProductTable";
// import * as phonesData from "../../seed_data/products/index.json"
import Header from "./components/Header";
import Main from "./components/Main";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getProducts = async () => {
  const products = await prisma.phone.findMany()
  return products;
};



export default async function Home() {
  const products = await getProducts();

  console.log(typeof products[0].priceRegular);

  return (
    <div>
      <Header />
      <Main products={products} />

        {/* <main>
          <ProductsTable products={products} />
        </main> */}
      
    </div>
  );
}
