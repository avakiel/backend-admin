import Header from "./components/Header";
import Main from "./components/Main";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; 

export default async function Home() {
  const session = await getServerSession();

  if(!session || !session.user) {
    redirect('api/auth/signin')
  }

  return (
    <div>
      <Header />
      <Main />    
    </div>
  );
}
