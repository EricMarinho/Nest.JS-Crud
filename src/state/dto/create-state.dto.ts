import { IsString } from "class-validator";

export class CreateStateDto {
    @IsString()
    name: string;

    @IsString()
    abbreviation: string;

    @IsString()
    fun_fact: string;
}