import { StateEntity } from "@src/state/entities/state.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";


export async function createState(stateRepository?: Repository<StateEntity>, state?: Partial<StateEntity>,) {
   const stateEntity = new StateEntity();

   const uuid = uuidv4();

   if(state?.id)
    stateEntity.id = state?.id;

    stateEntity.name = state?.name || "User Name -" + uuid;
    stateEntity.abbreviation = state?.abbreviation ||  "user" + uuid + "@mail.com";
    stateEntity.fun_fact = state?.fun_fact || "funfact";

    return await stateRepository?.save(stateEntity);

}