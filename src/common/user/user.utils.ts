import { UserEntity } from "@src/user/entities/user.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";


export async function createUser(userRepository?: Repository<UserEntity>, user?: Partial<UserEntity>,) {
   const userEntity = new UserEntity();

   const uuid = uuidv4();

   if(user?.id)
    userEntity.id = user?.id;

    userEntity.name = user?.name || "User Name -" + uuid;
    userEntity.email = user?.email ||  "user" + uuid + "@mail.com";
    userEntity.password = user?.password || "123456";
    userEntity.role = user?.role || "user - " + uuid;

    return await userRepository?.save(userEntity);

}