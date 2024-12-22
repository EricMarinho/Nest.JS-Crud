import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions } from 'ormconfig';
import { StateEntity } from './entities/state.entity';

describe('StateController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      imports: [
        TypeOrmModule.forRoot(configOptions),
        TypeOrmModule.forFeature(
          [
            StateEntity,
          ]
        )
      ],
      providers: [StateService],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
