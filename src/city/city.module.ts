import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityEntity } from './entities/city.entity';
import { StateEntity } from 'src/state/entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CityController],
  providers: [CityService],
    imports:[
      TypeOrmModule.forFeature([
        CityEntity,
      ])
    ]
})
export class CityModule {}
