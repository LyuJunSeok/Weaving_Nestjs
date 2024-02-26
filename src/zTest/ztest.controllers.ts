import { userInfo } from "os";
import { devOraDB } from "../data-source";
import { UseGuards, Inject, Logger, LoggerService, Controller, Param, Body, Get, Post, Put, Delete, Req  } from '@nestjs/common';
import { TestEntity } from "src/entity/testgroup/test.entity";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { TestUserEntity } from 'src/entity/testgroup/testUser.entity';
import { ZTestService } from './ztest.service';
import { CreateUsersDto } from './dto/ztest-create-users.dto';
import { UsersCreateDto } from "./dto/users.create.dto";
import { AuthRefreshGuard } from 'src/authrefresh.guard';
import { AuthGuard } from "src/auth.guard";

@Controller('ztest')
export class ZTestController {
    constructor(
        private readonly ZTestService: ZTestService,
        @Inject(Logger) private readonly logger: LoggerService, 
        // private configService: ConfigService,       
        ) {}

    // Request Log 
    private printLoggerServiceLog(dto: any, LogTitle: string) {
        this.logger.log(`[Weaving Req Log] ` + LogTitle + `: `  + JSON.stringify(dto));
    }        

    // Guard Test
    @UseGuards(AuthGuard)
    @Get()
    getZTestList(@Req() req): object {

        console.log(req.authUser.id);        
        return this.ZTestService.selectTestList();
    }

    @Post('/create')
    // createTestUser(@Body() testUserDto: TestUserEntity): Promise<any> {
    createTestUser(@Body() testUserDto: TestUserEntity) {
        // console.log(testUserDto);
        // this.printLoggerServiceLog(testUserDto, 'CreateTestUser'); 
        return this.ZTestService.createTestUser(testUserDto); 
    }

    // Users : create
    @Post('/users-create')
    usersCreate(@Body() usersCreateDto: UsersCreateDto) {
        // console.log(usersCreateDto);

        // return this.ZTestService.usersCreate(usersCreateDto); 
    }





    @Post()
    async postCreateUsers(@Body() createUsersDto: CreateUsersDto): Promise<any> {
        // this.printLoggerServiceLog(createUsersDto, `CreateUsers`);
        // console.log(createUsersDto);
        // const resData = await this.ZTestService.usersCreate(createUsersDto);

        // return resData;
    }


    @Get('/:SEQ')
    getZTestId(@Param('SEQ') SEQ: number) {
        // console.log(`Select UserID : ${SEQ}`);
        
        return this.ZTestService.usersfindOne(SEQ);
    }

}
