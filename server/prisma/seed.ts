import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = ['Электроника', 'Одежда', 'Продукты', 'Мебель', 'Инструменты'];
const BRANDS = ['Samsung', 'Nike', 'Bosch', 'IKEA', 'Apple', 'Adidas', 'LG', 'Sony'];

async function main() {
  console.log('Seeding 50 000 products...');

  const BATCH_SIZE = 1000;
  const TOTAL = 50000;

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const data = Array.from({ length: Math.min(BATCH_SIZE, TOTAL - i) }, (_, j) => {
      const idx = i + j;
      return {
        name: `Товар ${idx + 1}`,
        category: CATEGORIES[idx % CATEGORIES.length],
        brand: BRANDS[idx % BRANDS.length],
        price: Math.floor(Math.random() * 100000) + 1000,
        characteristics: Array.from(
          { length: (idx % 6) + 1 },
          (_, k) => `Характеристика ${String.fromCharCode(65 + k)}${idx}`,
        ),
      };
    });

    await prisma.product.createMany({ data });
    console.log(`  ${i + data.length} / ${TOTAL}`);
  }

  console.log('Done.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
