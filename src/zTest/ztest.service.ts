import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { TestEntity } from 'src/entity/testgroup/test.entity';
import { TestUserEntity } from 'src/entity/testgroup/testUser.entity';
import { CreateUsersDto } from './dto/ztest-create-users.dto';
import { UsersCreateDto } from "./dto/users.create.dto";



@Injectable()
export class ZTestService {
    constructor(
        @InjectRepository(TestEntity) private testRepository: Repository<TestEntity>,
        @InjectRepository(TestUserEntity) private testUserRepository: Repository<TestUserEntity>,
        
        // DataSource : default
        // private dataSource: DataSource,
        @InjectDataSource('default') private readonly mainDB: DataSource,

        // Req, Res Logger
        private readonly logger: Logger,
    ) {}
    // Response Log 
    private PrintLoggerServiceLog(logTitle: string, logData: any) {
        this.logger.log(`[Weaving Res Log] ` + logTitle + `: ` + JSON.stringify(logData));
    }
    
    // Typeorm : Save > 변수사용
    async createTestUser(testUserDto) : Promise<TestUserEntity> {
        const { EMAIL, PASSWORD, USERNAME } = testUserDto        
        const dtoUser = new TestUserEntity;
        
        dtoUser.EMAIL = EMAIL;
        dtoUser.PASSWORD = PASSWORD;
        dtoUser.USERNAME = USERNAME;
        dtoUser.CDATE = new Date();
        // console.log(dtoUser);

        const resData = await this.testUserRepository.save(dtoUser);                // 항목 재설정 후 저장
        // const resData = await this.testUserRepository.save(testUserDto);         // 기본 저장
        
        // this.PrintLoggerServiceLog('CreateTestUser', resData);
         return resData;
    }

    // async usersCreate(usersCreateDto) : Promise<UsersCreateDto> {
    //     const { USER_NAME, USER_PASSWD, PHONE } = usersCreateDto        
    //     const dtoData = new UsersCreateDto;
    //         dtoData.USER_NAME = USER_NAME;
    //         dtoData.USER_PASSWD = await this.dataEncryption(USER_PASSWD); //암호화 적용;
    //         dtoData.USER_STATUS = 'Y';
    //         dtoData.PHONE = PHONE;
    //         dtoData.USE_YN = 'Y';
    //         dtoData.REG_ID = 'System';
    //         dtoData.REG_DATE = new Date();
    //         dtoData.UPT_ID = 'System';
    //         dtoData.UPT_DATE = new Date();
    //         dtoData.AUTHORITY = 'Y';
    //         dtoData.USER_PASSWD_TYPE = 'Y';

        // const resData = await this.testUserRepository.save(dtoData);                // 항목 재설정 후 저장        
        
        // return resData;
    // }



    // Typeorm : Save > DTO 사용
    async testCreate(createUsersDto: CreateUsersDto) {
        const { SEQ } = createUsersDto;
        const dtoUsers = new TestEntity;
        dtoUsers.SEQ = SEQ;
        return await this.testRepository.save(dtoUsers);
        // return await this.usersRepository.save(createUsersDto);
    }

    // Typeorm : findOne
    async usersfindOne(SEQ: number) {
        return await this.testUserRepository.findOne({
            where: { ID: SEQ}
        });
    }

    // 쿼리 호출
    // selectTestList() {
    async selectTestList(): Promise<TestEntity[]> {        
        const selectQuery = 
            `select * 
            from    TEST_USER
            where   1=1 
            and     ID != ${3}
            order by ID DESC
            `;
            // `select * from USERS`;
        const resData = await this.mainDB.query(selectQuery);

        // API Log 설정
        let returnMsg = 'Log Test';
        // this.PrintLoggerServiceLog('Interface Item Save Result', returnMsg); 
        return resData;
    }

    // 쿼리 빌더
    async selectTestList2(): Promise<any> {
        const resData = await this.mainDB.manager
            .createQueryBuilder()
            .select("TestUser")
            .from(TestUserEntity, "TestUser")
            .where(
                'ID != :reqID and PASSWORD like :reqPassword', 
                { reqID : 4, reqPassword : '%1%' })
            .orderBy({
                'ID': 'DESC'
            })
            .getMany();
        return resData;
    }

    //======================================================================================//
    
    
    // Data 암호화
    async dataEncryption(EncryptionData: string): Promise<string> {
        // console.log(EncryptionData);
        const bcryptSecret = await bcrypt.genSalt();
        // console.log(bcryptSecret);
        EncryptionData = await bcrypt.hash(EncryptionData, bcryptSecret);    
        // console.log(EncryptionData);

        return EncryptionData;
    }


}
