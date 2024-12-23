import { TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';
import { createDefaultModule } from '@src/common/utils/test.utils';
import { DataSource } from 'typeorm';
import { createCity } from '@src/common/city/city.utils';

describe('CityController', () => {
  let controller: CityController;
  let connection: DataSource  

  beforeAll(async () => {
    const module: TestingModule = await createDefaultModule({
      providers: [CityService],
      controllers: [CityController],
      typeorm_entities: [CityEntity],
    })
    connection = await module.get(DataSource)
    controller = module.get<CityController>(CityController);
  });

  beforeEach(async () => {
    //reset database
    await connection.dropDatabase()
    await connection.runMigrations()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cities', async () => {
    const city1 = await createCity(connection.getRepository(CityEntity))
    const city2 = await createCity(connection.getRepository(CityEntity))
    const cities = await controller.findAll();

    expect(cities[0].id).toEqual(city1.id)
    expect(cities[1].id).toEqual(city2.id)
  });

  it('should return a city', async () => {
    const city = await createCity(connection.getRepository(CityEntity))
    const foundCity = await controller.findOne(city.id);

    expect(foundCity.id).toEqual(city.id)
  });

  it('should create a city', async () => {
    const city = await controller.create({
      name: 'City Name'
    });

    expect(city.id).toBeDefined()
    expect(city.name).toEqual('City Name')
  });

  it('should update a city', async () => {
    const city = await createCity(connection.getRepository(CityEntity))
    const updatedCity = await controller.update(city.id, {
      name: 'City Name Updated'
    });

    expect(updatedCity.id).toEqual(city.id);
    expect(updatedCity.name).toEqual('City Name Updated');
  });

  it('should remove a city', async () => {
    const city = await createCity(connection.getRepository(CityEntity))
    const deletedCity = await controller.remove(city.id);

    expect(deletedCity.id).toBeUndefined();
  });
  
});
