import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCountService } from './product-count.service';
import { CreateProductCountDto } from './dto/create-product-count.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';

@Controller('product-count')
export class ProductCountController {
  constructor(private readonly productCountService: ProductCountService) {}

  @Post()
  create(@Body() createProductCountDto: CreateProductCountDto) {
    return this.productCountService.create(createProductCountDto);
  }

  @Get()
  findAll() {
    return this.productCountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCountDto: UpdateProductCountDto) {
    return this.productCountService.update(+id, updateProductCountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCountService.remove(+id);
  }
}
