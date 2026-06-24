import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  findAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    return this.productsService.findAll(+limit, +offset);
  }
}
