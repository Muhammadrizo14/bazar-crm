import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Request} from "@nestjs/common";
import {AppService} from "./app.service";
import {Request as Req} from "express";

@ApiBearerAuth()
@ApiTags('App')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getOrganizationData(@Request() req: Req) {
    return this.appService.getOrganizationData(req)
  }
}