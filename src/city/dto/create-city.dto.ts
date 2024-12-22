import { IsString, IsUUID } from "class-validator";

export class CreateCityDto {
    @IsString()
    name: string;
    
    @IsUUID()
    state_id: string;
}