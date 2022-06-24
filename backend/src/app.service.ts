import {Injectable} from "@nestjs/common";
import {PrismaService} from "./prisma/prisma.service";
import {validateOrganization} from "./util";
import {Request as Req} from "express";
import * as _ from "lodash";

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {
  }

  async getOrganizationData(req: Req) {``

    const organization = await validateOrganization(req)

    const userIds = await this.prismaService.user_balance.groupBy({
      by: ['user_id'],
      _sum: {amount: true},
      where: {organization_id: organization.id}
    }).then(res => res.filter(item => item._sum.amount < 0).map(item => item.user_id))


  }
}