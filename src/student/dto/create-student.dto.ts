import { IsNumber, IsOptional, IsString } from "class-validator";
import { DeleteDateColumn } from "typeorm";

export class CreateStudentDto {
    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly faculty: string;

    @IsOptional()
    @IsNumber()
    readonly gpa:number;

    
}
