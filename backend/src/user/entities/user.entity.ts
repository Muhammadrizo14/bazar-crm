import {BaseEntity} from "../../util/entities/base.entity";
import { IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserEntity extends BaseEntity {
    @ApiProperty()
    @MinLength(4, {message: "errors.minLength4"})
    @IsNotEmpty({message:"errors.isNotEmpty"})
    @IsString({message:"errors.isString"})
    username:   string

    @ApiProperty()
    @MinLength(4, {message: "errors.minLength4"})
    @IsNotEmpty({message:"errors.isNotEmpty"})
    @IsString({message:"errors.isString"})
    password:   string

    @ApiProperty()
    @IsNotEmpty({message:"errors.isNotEmpty"})
    @IsNumber({},{message:"errors.isNumber"})
    roleId:     number

    static gender = [
        {
            id: 1,
            name: 'male'
        },
        {
            id:2,
            name: 'female'
        }
    ]

    static adminRoleId = 1
    static teacherRoleId = 2
    static studentRoleId = 3
    static managerRoleId = 4
}
