import { TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { DataSource } from 'typeorm';
import { StateEntity } from './entities/state.entity';
import { StateService } from './state.service';
import { createDefaultModule } from '@src/common/utils/test.utils';
import { createState } from '@src/common/state/state.utils';

describe('StateController', () => {
  let controller: StateController;
  let connection: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await createDefaultModule({
      providers: [StateService],
      typeorm_entities: [StateEntity],
      controllers: [StateController]
    })
    connection = await module.get(DataSource)
    controller = module.get<StateController>(StateController);
  });
  
  beforeEach(async () => {
    //reset database
    await connection.dropDatabase()
    await connection.runMigrations()
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all states', async () => {
    const state1 = await createState(connection.getRepository(StateEntity))
    const state2 = await createState(connection.getRepository(StateEntity))
    const states = await controller.findAll();

    expect(states[0].id).toEqual(state1.id)
    expect(states[1].id).toEqual(state2.id)
  });
  
  it('should return a state', async () => {
    const state = await createState(connection.getRepository(StateEntity))
    const foundState = await controller.findOne(state.id);

    expect(foundState.id).toEqual(state.id)
  });

  it('should create a state', async () => {
    const state = await controller.create({
      name: 'State Name',
      abbreviation: 'SN',
      fun_fact: 'Fun Fact'
    });

    expect(state.id).toBeDefined()
    expect(state.name).toEqual('State Name')
    expect(state.abbreviation).toEqual('SN')
    expect(state.fun_fact).toEqual('Fun Fact')
  });

  it('should update a state', async () => {
    const state = await createState(connection.getRepository(StateEntity))
    const updatedState = await controller.update(state.id, {
      name: 'State Name Updated'
    });

    expect(updatedState.id).toEqual(state.id)
    expect(updatedState.name).toEqual('State Name Updated')
  });

  it('should remove a state', async () => {
    const state = await createState(connection.getRepository(StateEntity))
    const states = await controller.findAll();
    expect(states.length).toEqual(1)

    await controller.remove(state.id);
    const statesAfterDelete = await controller.findAll();
    expect(statesAfterDelete.length).toEqual(0)
  });
});
