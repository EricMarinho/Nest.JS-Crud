
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptionsTesting } from 'ormconfig';

export async function createDefaultModule(
    options: {
        imports?: any[];
        providers?: any[];
        controllers?: any[];
        exports?: any[];
        typeorm_entities?: any[];
    }
) {
     const module = Test.createTestingModule({
        controllers: options.controllers || [],
        providers: options.providers || [],
        imports:  [
            TypeOrmModule.forRoot(configOptionsTesting),
            TypeOrmModule.forFeature(
                options.typeorm_entities || []
            ),
            ...options.imports || [],
        ],
        exports: options.exports || []
     })

    if (options.imports) {
        module
    }

    return module.compile();
}