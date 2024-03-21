import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const jsonPaths = [
    '../seed_data/products/accessories.json',
  ]

  for (const jsonPath of jsonPaths) {
    const data = require(jsonPath)

    let model
   if (jsonPath.includes('accessories')) model = prisma.accessory


    for (const record of data) {
      if (model) {
        await model.create({ data: record })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })