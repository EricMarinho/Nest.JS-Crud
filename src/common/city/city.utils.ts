import { CityEntity } from "@src/city/entities/city.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";


export async function createCity(cityRepository?: Repository<CityEntity>, city?: Partial<CityEntity>,) {
   const cityEntity = new CityEntity();

   const uuid = uuidv4();

   if(city?.id)
    cityEntity.id = city?.id;

    cityEntity.name = city?.name || "User Name -" + uuid;

    return await cityRepository?.save(cityEntity);

}