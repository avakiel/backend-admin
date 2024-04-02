const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const products = require('../seed_data/products/products.json');
const phoneDetails = require('../seed_data/products/phone.json');
const tabletDetails = require('../seed_data/products/tablets.json');
const accessoriesDetails = require('../seed_data/products/accessories.json');

async function seed() {
  const categories = [
    { name: 'Phone' },
    { name: 'Tablet' },
    { name: 'Accessories' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  for (const product of products) {
    let category;
    switch (product.category) {
      case 'Phone':
        category = phoneDetails[product.year];
        break;
      case 'Tablet':
        category = tabletDetails[product.year];
        break;
      case 'Accessories':
        category = accessoriesDetails[product.year];
        break;
      default:
        throw new Error('Unknown category');
    }

    await prisma.product.create({
      data: {
        ...product,
        categoryId: category.id,
      },
    });
  }
}

async function main() {
  try {
    await seed();
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
