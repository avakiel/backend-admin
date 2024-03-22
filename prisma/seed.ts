const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('../seed_data/products/products.json');

async function main() {
  for (const record of data) {
    try {
      let category = await prisma.category.findFirst({
        where: { name: record.category },
      });

      if (!category) {
        category = await prisma.category.create({
          data: { name: record.category },
        });
      }

      await prisma.product.create({
        data: {
          itemId: record.itemId,
          name: record.name,
          fullPrice: record.fullPrice,
          price: record.price,
          screen: record.screen,
          capacity: record.capacity,
          color: record.color,
          ram: record.ram,
          year: record.year,
          image: record.image,
          categoryId: category.id,
        },
      });
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });

