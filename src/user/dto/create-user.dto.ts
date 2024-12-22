import { IsEmail, IsIn, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsIn(["admin", "user"])
    @IsString()
    role: string;
    
    @IsUUID()
    @IsOptional()
    city_id?: string;
}