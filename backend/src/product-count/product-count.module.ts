import { Module } from '@nestjs/common';
import { ProductCountService } from './product-count.service';
import { ProductCountController } from './product-count.controller';

@Module({
  controllers: [ProductCountController],
  providers: [ProductCountService]
})
export class ProductCountModule {}
