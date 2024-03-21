// pages/api/products/[id].js
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();
// const cors = initMiddleware(
//   Cors({
//     origin: '*', // Allow requests from any origin, you can restrict it to specific origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods you intend to use
//   })
// );

export default async function handle(req, res) {
  // await cors(req, res);

  if (req.method === 'DELETE') {
    const { id } = req.query;

    const product = await prisma.phone.delete({
      where: { id },
    });

    console.log(product);
  
    res.json(product);
  } else {
    res.status(405).json({ message: 'Not allowed' });
  }
}
