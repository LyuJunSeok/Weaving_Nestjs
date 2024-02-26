import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignInService } from './signin.service';
import { SignInController } from './signin.controllers';
import { AuthModule } from 'src/system/auth/auth.module';
import { MdmsUserEntity } from 'src/entity/MDMS/mdmsUser.entity';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            MdmsUserEntity
        ])
    ],
    controllers: [
        SignInController, 
    ],
    providers: [
        Logger,
        SignInService,  
    ],
})
export class SignInModule {}
