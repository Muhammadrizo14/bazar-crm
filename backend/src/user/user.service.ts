import {ForbiddenException, Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from "../prisma/prisma.service";
import {AuthDto} from "../auth/dto/authDto";
import {QueryParamEntity} from "../util/entities/queryParam.entity";
import {prepareRowQuery} from "../util";
import organizationNotFoundException from "../util/exeptions/organizationNotFoundException";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {
  }

  create(createUserDto: Prisma.userUncheckedCreateInput) {
    return this.prismaService.user.create({data: createUserDto});
  }

  async findAll(query: object) {
    const totalRecords = await this.prismaService.user.findMany({where: {...query['where']}}).then(res => res.length)
    const items = await this.prismaService.user.findMany({
      where: {...query['where']},
      take: query['take'],
      skip: query['skip'],
      orderBy: {...query['orderBy']},
    })
    return {totalRecords, items}
  }

  async filter(query: QueryParamEntity, table) {
    return await prepareRowQuery(query, this.prismaService, table)
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({where: {id}});
  }

  async findOneByEmail({username}: AuthDto) {
    const user = await this.prismaService.user.findUnique({where: {username}});
    if (user) {
      const organization = await this.prismaService.organization.findUnique({where: {id: user.organization_id}})
      if (!organization) {
        throw organizationNotFoundException
      }
    }
    return user
  }

  update(id: number, updateUserDto: Prisma.userUncheckedUpdateInput) {
    return this.prismaService.user.update({data: updateUserDto, where: {id}})
  }

  remove(id: number) {
    return this.prismaService.user.delete({where: {id}});
  }

  removeMany(ids: number[]) {
    return this.prismaService.user.deleteMany({
      where: {
        id: {in: ids}
      }
    })
  }

  // async groupStudentService(user_id: number) {
  //   const groupIds = await this.prismaService.group_student.findMany({where: {user_id}, select: {group_id: true}}).then(res => {
  //     return res.map(item => item.group_id)
  //   })
  //   return await this.prismaService.group.findMany({where: {id: {in: groupIds}}, include: {teacher: true, course: true}})
  // }
}
