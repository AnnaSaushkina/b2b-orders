import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit: number, offset: number, search: string) {
    const whereObj: Prisma.ProductWhereInput = {
      name: { contains: search, mode: 'insensitive' },
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        take: limit,
        skip: offset,
        where: whereObj,
      }),
      this.prisma.product.count({
        where: whereObj,
      }),
    ]);
    return { items, total };
  }
}
