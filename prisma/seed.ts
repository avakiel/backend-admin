import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const data = require('./../seed_data/products/index.json');

  for (const item of data) {
    try {
      await prisma.phone.create({ data: item });
      console.log(`Phone ${item.name} created successfully.`);
    } catch (error) {
      console.error(`Error creating phone ${item.name}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });