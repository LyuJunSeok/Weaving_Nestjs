import { Body, Controller, Get, Inject, Logger, LoggerService, Param, Post, UseGuards, Headers, Query, Res, Req } from '@nestjs/common';
// import { AuthService } from 'src/common/auth/auth.service';
// import { AuthRefreshGuard } from 'src/authrefresh.guard';
import { UserSignInDto } from './dto/user-signin.dto';
import { SignInService } from './signin.service';


@Controller('home/signin')
export class SignInController {
    constructor(
        private signInService: SignInService,
        // private authService: AuthService,
        @Inject(Logger) private readonly logger: LoggerService, 
        // private configService: ConfigService,       
        ) {}

    // Request Log 
    private printLoggerServiceLog(dto: any, LogTitle: string) {
        this.logger.log(`[Weaving Req Log] ` + LogTitle + `: `  + JSON.stringify(dto));
    }      

    // Sing-In
    @Post('/login')
    async login(@Body() userSignInDto: UserSignInDto) {
        console.log(userSignInDto)
        //   this.printLoggerServiceLog(userSignInDto, `LoginUser`);
        const resData = await this.signInService.login(userSignInDto);
      
        return resData;
    }


}
