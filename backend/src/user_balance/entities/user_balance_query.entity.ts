import {BaseEntity} from "../../util/entities/base.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class User_balance_queryEntity {
  user_id?: number
}
