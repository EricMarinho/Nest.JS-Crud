import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCityDto {
    @IsString()
    name: string;

    @IsUUID()
    @IsOptional()
    state_id?: string;
}