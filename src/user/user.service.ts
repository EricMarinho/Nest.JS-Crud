import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>
  ){}

  create(createUserDto: CreateUserDto) {
    const data = this.userRepository.create(createUserDto);
    return this.userRepository.save(data);
  }

  findAll() {
    return this.userRepository.find({
      relations: {city: {state: true}}
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne(
      {
        where: {id},
        relations: {city: {state: true}}
      },
    )
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = this.userRepository.create(updateUserDto);
    await this.userRepository.update({id}, data);
    return this.userRepository.findOne({where: {id}});
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    return this.userRepository.remove(user);
  }
}
