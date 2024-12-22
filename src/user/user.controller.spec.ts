import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { configOptions } from 'ormconfig';
import { createDefaultModule } from '@src/common/utils/test.utils';
import { DataSource } from 'typeorm';
import { createUser } from '@src/common/user/user.utils';

describe('UserController', () => {
  let controller: UserController;
  let connection: DataSource

  beforeAll(async () => {
    const module: TestingModule = await createDefaultModule({
      providers: [UserService],
      typeorm_entities: [UserEntity],
      controllers: [UserController]
    })
    connection = await module.get(DataSource)
    controller = module.get<UserController>(UserController);
  });
  
  beforeEach(async () => {
    //reset database
    await connection.dropDatabase()
    await connection.runMigrations()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const user1 = await createUser(connection.getRepository(UserEntity))
    const user2 = await createUser(connection.getRepository(UserEntity))
    const users = await controller.findAll();

    expect(users[0].id).toEqual(user1.id)
    expect(users[1].id).toEqual(user2.id)
  });

  it('should return a user', async () => {
    const user = await createUser(connection.getRepository(UserEntity))
    const foundUser = await controller.findOne(user.id);

    expect(foundUser.id).toEqual(user.id)
  });

  it('should create a user', async () => {
    const user = await controller.create({
      name: 'John Doe',
      email: 'email@gmail.com',
      password: 'password',
      role: 'admin'
    });

    expect(user.id).toBeDefined()
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('email@gmail.com')
    expect(user.password).toEqual('password')
    expect(user.role).toEqual('admin')
    expect(user.city_id).toBeNull()
  });

  it('should update a user', async () => {
    const user = await createUser(connection.getRepository(UserEntity))
    const updatedUser = await controller.update(user.id, {
      name: 'Jane Doe',
      email: 'email@gmail.com',
      password: 'password',
      role: 'admin'
    });

    expect(updatedUser.id).toEqual(user.id);
    expect(updatedUser.name).toEqual('Jane Doe');
    expect(updatedUser.email).toEqual('email@gmail.com');
    expect(updatedUser.password).toEqual('password');
    expect(updatedUser.role).toEqual('admin');
  });   

  it('should delete a user', async () => {
    const user = await createUser(connection.getRepository(UserEntity))
    const deletedUser = await controller.remove(user.id);

    expect(deletedUser.id).toBeUndefined()
  });

});
