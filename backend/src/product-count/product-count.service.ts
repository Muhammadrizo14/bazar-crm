import { Injectable } from '@nestjs/common';
import { CreateProductCountDto } from './dto/create-product-count.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ProductCountService {

  constructor(private prismaService:PrismaService) {
  }

  create(createProductCountDto: CreateProductCountDto) {
    return this.prismaService.product_count.create({data: createProductCountDto})
  }

  findAll() {
    return this.prismaService.product_count.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product_count.findUnique({where:{ id }})
  }

  update(id: number, updateProductCountDto: UpdateProductCountDto) {
    return this.prismaService.product_count.update({where:{ id },data:updateProductCountDto})
  }

  remove(id: number) {
    return this.prismaService.product_count.delete({where:{ id }})
  }
}
