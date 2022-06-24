import { Injectable } from '@nestjs/common';
import { Prisma } from "@prisma/client"
import {PrismaService} from "../prisma/prisma.service";
import {User_balance_queryEntity} from "./entities/user_balance_query.entity";
import {UserBalanceEntity} from "./entities/user_balance.entity";

@Injectable()
export class UserBalanceService {
  constructor(private prismaService: PrismaService) {}

  create(createUserBalanceDto: UserBalanceEntity) {
    return this.prismaService.user_balance.create({data: createUserBalanceDto})
  }

  findAll(query: User_balance_queryEntity) {
    const where = query.user_id ? {user_id: +query.user_id} : {}
    return this.prismaService.user_balance.findMany({where})
  }

  findOne(id: number) {
    return this.prismaService.user_balance.findUnique({where: {id}})
  }

  remove(id: number) {
    return this.prismaService.user_balance.delete({where: {id}})
  }
}
