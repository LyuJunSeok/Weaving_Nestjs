import { Inject, Injectable, Logger, LoggerService, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/system/auth/auth.service';
import { MdmsUserEntity } from 'src/entity/MDMS/mdmsUser.entity';
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class SignInService { 
    constructor(
        private authService: AuthService,
        @InjectDataSource('default') private readonly mainDB: DataSource,
        @Inject(Logger) private readonly logger: LoggerService, 
        // Repository
        @InjectRepository(MdmsUserEntity) private mdmsUserRepository: Repository<MdmsUserEntity>,
    ) {}

    //Log 호출
    private printLoggerServiceLog(dto: object, LogTitle: string) {
        this.logger.log(`[Log] ` + LogTitle + `: `  + JSON.stringify(dto));
    }


    // Login
    async login(userSignInDto: UserSignInDto): Promise<object> {
        // Loign Log
        this.printLoggerServiceLog(userSignInDto, `Login History`);

        const { id, password, loginType } = userSignInDto;

        const user = await this.mdmsUserRepository.findOne({
            where: { ID: id }
        });

        if (!user) {
            throw new NotFoundException('사용자가 존재하지 않습니다');
        }

        let userAuth = await this.dataDecryption(id, password);
        if(userAuth != 'success'){
            // console.log(userAuth)
            throw new UnauthorizedException(`Login failed`)
        }

        const accessToken = this.authService.loginCreateAccessToken({
            index: user.SEQ,
            id: user.ID,
            name: user.NAME,
        })
    
        const refreshToken = this.authService.loginCreateRefreshToken({
            index: user.SEQ,
            id: user.ID,
            name: user.NAME,
        })
    
        return {
            AccessToken: accessToken,
            RefreshToken: refreshToken      
        };
    }

    // Data 복호화 > Password
    async dataDecryption(id: string, password: string): Promise<string> {
        const userData = await this.mdmsUserRepository.findOne({
            where: { ID: id }
        })

        if (!userData) {
            throw new NotFoundException('사용자가 존재하지 않습니다');
        }
    
        if (userData && (await bcrypt.compare(password, userData.PASSWD))) {
            return 'success';
        } else {
            return 'failed';
        }
    }

    // AccessToken Reset
    async resetToken(id: string): Promise<object> {

        const user = await this.mdmsUserRepository.findOne({
            where: { ID: id }
        });

        if (!user) {
            throw new NotFoundException('사용자가 존재하지 않습니다');
        }

        const accessToken = this.authService.loginCreateAccessToken({
            index: user.SEQ,
            id: user.ID,
            name: user.NAME,
        })
    
        const refreshToken = this.authService.loginCreateRefreshToken({
            index: user.SEQ,
            id: user.ID,
            name: user.NAME,
        })
    
        return {
            AccessToken: accessToken,
            RefreshToken: refreshToken      
        };

    }
    


}
