import { Optional } from "@nestjs/common";
import { IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string

    @IsStrongPassword()
    password: string

    @Optional()
    nickName: string;
}

export class LoginUserDto {
    @IsString()
    username: string

    @IsStrongPassword()
    password: string
}
