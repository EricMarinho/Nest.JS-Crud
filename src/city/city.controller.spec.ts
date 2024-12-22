import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from 'ormconfig';
import { CityEntity } from './entities/city.entity';
import { createDefaultModule } from '@src/common/utils/test.utils';

describe('CityController', () => {
  let controller: CityController;

  beforeEach(async () => {

    const module: TestingModule = await createDefaultModule({
      providers: [CityService],
      controllers: [CityController],
      typeorm_entities: [CityEntity],
    })

    controller = module.get<CityController>(CityController);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
