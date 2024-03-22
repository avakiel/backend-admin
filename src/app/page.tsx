import Header from "./components/Header";
import Main from "./components/Main";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getProducts = async () => {
  const products = await prisma.phone.findMany()
  return products;
};

export default async function Home() {
  const products = await getProducts();
  const session = await getServerSession();

  if(!session || !session.user) {
    redirect('api/auth/signin')
  }

  return (
    <div>
      <Header />
      <Main products={products} />    
    </div>
  );
}
