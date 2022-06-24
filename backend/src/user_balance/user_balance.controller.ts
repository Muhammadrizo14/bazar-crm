import {Controller, Get, Post, Body, Param, Delete, Query, NotFoundException, UseGuards} from '@nestjs/common';
import { UserBalanceService } from './user_balance.service';
import {UserBalanceEntity} from "./entities/user_balance.entity";
import {User_balance_queryEntity} from "./entities/user_balance_query.entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Me} from "../auth/guards/me.guard";
import forbiddenException from "../util/exeptions/forbiddenException";

@Controller('user-balance')
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}
  private tag = 'UserBalance'

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Me() me, @Body() createUserBalanceDto: UserBalanceEntity) {
    if (!me.permissions.includes(this.tag+'.create')) {
      throw forbiddenException;
    }
    return this.userBalanceService.create(createUserBalanceDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Me() me, @Query() query: User_balance_queryEntity) {
    if (!me.permissions.includes(this.tag+'.read') && +query.user_id !== me.id) {
      throw forbiddenException;
    }
    return this.userBalanceService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Me() me, @Param('id') id: string) {
    if (!me.permissions.includes(this.tag+'.read')) {
      throw forbiddenException;
    }
    const userBalance = await this.userBalanceService.findOne(+id);
    if (!userBalance) {
      throw new NotFoundException()
    }
    return userBalance
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Me() me, @Param('id') id: string) {
  //   if (!me.permissions.includes(this.tag+'.delete')) {
  //     throw forbiddenException;
  //   }
  //   return this.userBalanceService.remove(+id);
  // }
}
