import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {

  constructor(
    @InjectRepository(StateEntity)
    readonly stateRepository: Repository<StateEntity>
  ) {}

  create(createStateDto: CreateStateDto) {
    const data = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(data);
  }

  findAll() {
    return this.stateRepository.find();
  }

  findOne(id: string) {
    return this.stateRepository.findOne({where: {id}});
  }

  update(id: string, updateStateDto: UpdateStateDto) {
    const data = this.stateRepository.create(updateStateDto);
    return this.stateRepository.update({id}, data);
  }

  remove(id: string) {
    return this.stateRepository.delete({id});
  }
}
