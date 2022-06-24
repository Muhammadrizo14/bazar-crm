import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {MainReportEntity} from "./entities/mainReport.entity";

@Injectable()
export class ReportService {
  constructor(private prismaService: PrismaService) {
  }

  async getMainReport(where: object) {
    const payments = await this.prismaService.payment.findMany({
      where,
      select: {
        id: true,
        amount: true,
        createdAt: true,
        comment: true,
        user: {include: {Student: true}},
        Staff: {include: {Teacher: true}}
      },
    }).then(res => {
      return res.map(item => {
        return {
          id: item.id,
          amount: item.amount,
          createdAt: item.createdAt,
          comment: item.comment,
          student: item.user.Student,
          staff: item.Staff
        }
      })
    })
    const payouts = await this.prismaService.payout.findMany({
      where,
      select: {
        id: true,
        amount: true,
        createdAt: true,
        comment: true,
        User: {include: {Teacher: true, Student: true}},
        Staff: {include: {Teacher: true}}
      },
    }).then(res => {
      return res.map(item => {
        if (item.User) {
          return {
            id: item.id,
            amount: item.amount,
            createdAt: item.createdAt,
            comment: item.comment,
            user: item.User.Teacher ? item.User.Teacher : item.User.Student,
            staff: item.Staff
          }
        }
        return {
          id: item.id,
          amount: item.amount,
          createdAt: item.createdAt,
          comment: item.comment,
          staff: item.Staff
        }
      })
    })
    return {payments, payouts}
  }
}
