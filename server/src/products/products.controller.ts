import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FindProductsDto } from './dto/find-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: FindProductsDto) {
    return this.productsService.findAll(
      query.limit,
      query.offset,
      query.search,
    );
  }
}
