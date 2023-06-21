import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('admin/products')
  async getAllProducts() {
    return this.productService.find({});
  }

  @Post('admin/products')
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.save(body);
  }

  @Put('admin/products/:id')
  async updateProduct(@Param('id') id: string, @Body() body: CreateProductDto) {
    await this.productService.update(id, body);
    return this.productService.findOne({ id });
  }

  @Delete('admin/products/:id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.delete(id);
  }
}
