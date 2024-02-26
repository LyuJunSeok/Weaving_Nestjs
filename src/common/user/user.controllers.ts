import { Body, Controller, Get, Inject, Logger, LoggerService, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from "src/auth.guard";
import { UserCreateDto } from './dto/user.create.dto';


@Controller('user')
export class UserController {    
    constructor(
        private readonly UserService: UserService,
        @Inject(Logger) private readonly logger: LoggerService
    ) {}


    // 사용자 조회 > Index
    @UseGuards(AuthGuard)
    @Get('/:index')
    getUserInfo(@Param('index') index: number) {
        console.log(index)
        return 'user info';
    }

    // 사용자 목록
    @Get()
    getUserList() {
        return 'user list';
    }

    // 사용자 등록
    @Post('/create')
    async createUser(@Body() userCreateDto: UserCreateDto) {
        console.log(userCreateDto);
        // return userCreateDto;
        return 'create user';
    }

}
