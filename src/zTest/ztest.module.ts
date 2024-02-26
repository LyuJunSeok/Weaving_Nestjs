import { Logger, Module } from '@nestjs/common';
import { ZTestController } from './ztest.controllers';
import { ZTestService } from './ztest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from 'src/entity/testgroup/test.entity'
import { TestUserEntity } from 'src/entity/testgroup/testUser.entity';
import { AuthModule } from 'src/system/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            TestEntity,
            TestUserEntity,
        ])
    ],
    controllers: [
        ZTestController
    ],
    providers: [
        Logger, 
        ZTestService
    ],
})
export class ZTestModule {}
