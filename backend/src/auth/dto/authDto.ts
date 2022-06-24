import {IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4, {message: "errors.minLength4"})
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(4, {message: "errors.minLength4"})
    password: string
}