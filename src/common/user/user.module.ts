import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controllers';
import { UserService } from './user.service';
import { AuthModule } from 'src/system/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WdbUserEntity } from 'src/entity/WDB/WDBcUser.entity';
import { SignInModule } from 'src/home/signin/signin.module';
import { MdmsUserEntity } from 'src/entity/MDMS/mdmsUser.entity';

@Module({
    imports: [
        AuthModule,
        SignInModule,
        TypeOrmModule.forFeature([
            WdbUserEntity,
        ])
    ],
    controllers: [
        UserController
    ],
    providers: [
        Logger,
        UserService, 
    ],
})
export class UserModule {}
