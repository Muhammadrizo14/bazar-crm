import {BaseEntity} from "../../util/entities/base.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class UserBalanceEntity extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty({message:"errors.isNotEmpty"})
  @IsNumber({},{message:"errors.IsSelected"})
  user_id:     number

  @ApiProperty()
  @IsNotEmpty({message:"errors.isNotEmpty"})
  @IsNumber({},{message:"errors.isNumber"})
  amount:     number

  @ApiProperty()
  @MinLength(4, {message: "errors.minLength4"})
  @IsNotEmpty({message:"errors.isNotEmpty"})
  @IsString({message:"errors.isString"})
  comment: string

  @ApiProperty()
  @IsNotEmpty({message:"errors.isNotEmpty"})
  @IsNumber({},{message:"errors.IsSelected"})
  group_id?:     number

  payment_id?:     number

  staff_id:     number
}
