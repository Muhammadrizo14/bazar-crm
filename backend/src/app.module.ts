import {MiddlewareConsumer, Module} from '@nestjs/common';
import { UserModule } from './user/user.module';
import {PrismaModule} from "./prisma/prisma.module";
import {RolesModule} from "./role/roles.module";
import {AuthModule} from "./auth/auth.module";
import {HelpersModule} from "./helpers/helpers.module";
import {GlobalMiddleware} from "./util/middlewares/global.middleware";
import {ScheduleModule} from "@nestjs/schedule";
import { UserBalanceModule } from './user_balance/user_balance.module';
import { ReportModule } from './report/report.module';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { ProductModule } from './product/product.module';

@Module({
  imports: [
      AuthModule,
      UserModule,
      PrismaModule,
      RolesModule,
      HelpersModule,
      ScheduleModule.forRoot(),
      UserBalanceModule,
      ReportModule,
      ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GlobalMiddleware)
      .forRoutes('*');
  }
}
