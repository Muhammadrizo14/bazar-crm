import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { ReportService } from './report.service';
import {MainReportEntity} from "./entities/mainReport.entity";
import * as _ from "lodash"
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Me} from "../auth/guards/me.guard";

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('main')
  @UseGuards(JwtAuthGuard)
  getMainReport(@Me() me, @Body() dto: MainReportEntity) {
    const where = MainReportEntity.fromRequest(dto, me.organization_id)
    return this.reportService.getMainReport(where)
  }
}
