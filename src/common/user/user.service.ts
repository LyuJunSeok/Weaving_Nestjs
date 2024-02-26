import { Inject, Injectable, Logger, LoggerService, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/system/auth/auth.service';
import { MdmsUserEntity } from 'src/entity/MDMS/mdmsUser.entity';
import { UserSignInDto } from 'src/home/signin/dto/user-signin.dto';

@Injectable()
export class UserService {
    constructor(
        private authService: AuthService,
        @InjectDataSource('default') private readonly mainDB: DataSource,
        @Inject(Logger) private readonly logger: LoggerService, 
        // Repository
    ) {}

   

    


}
