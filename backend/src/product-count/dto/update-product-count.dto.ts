import { PartialType } from '@nestjs/swagger';
import { CreateProductCountDto } from './create-product-count.dto';

export class UpdateProductCountDto extends PartialType(CreateProductCountDto) {}
