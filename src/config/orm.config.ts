import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';


export const oraORMConfig: DataSourceOptions = {
    type: 'oracle',
    // host: '146.56.45.203',
    host: process.env.MAIN_DATABASE_HOST,
    port: 1521,
    username: 'ORBIT',
    sid: 'JLDB',
    // sid: process.env.ORACLE_DATABASE_SID,
    password: 'JupiterLabs#20221014##',
    database: 'JLDB_STG', 
    connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=146.56.45.203)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=JLDB)))",
    // Entities
    entities: [__dirname + '/**/*.entity{.ts,.js}'], 
    dropSchema: false,
    // Auto-create database tables
    synchronize: false,
    // keepConnectionAlive: true,
    // Enable SQL query logging (helpful for debugging)
    logging: true, 
};

const dataSource = new DataSource(oraORMConfig);

export default oraORMConfig;





// export const oraORMConfig: TypeOrmModuleOptions = {
//     type: 'oracle',
//     host: '146.56.45.203',
//     // host: process.env.ORACLE_DATABASE_HOST,
//     // host: ConfigService.get('ORACLE_DATABASE_HOST'),
//     port: 1521,
//     username: 'ORBIT',
//     sid: 'JLDB',
//     // sid: process.env.ORACLE_DATABASE_SID,
//     password: 'JupiterLabs#20221014##',
//     database: 'JLDB_STG', 
//     connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=146.56.45.203)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=JLDB)))",
//     // Entities
//     entities: [__dirname + '/**/*.entity{.ts,.js}'], 
//     dropSchema: false,
//     // Auto-create database tables
//     synchronize: false,
//     keepConnectionAlive: true,
//     // Enable SQL query logging (helpful for debugging)
//     logging: true, 
    
// };

// export const mssqlORMConfig: TypeOrmModuleOptions = {
//     type: 'oracle',
//     host: '146.56.45.203',
//     // host: process.env.ORACLE_DATABASE_HOST,
//     port: 1521,
//     username: 'ORBIT',
//     sid: 'JLDB',
//     password: 'JupiterLabs#20221014##',
//     database: 'JLDB_STG', 
//     connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=146.56.45.203)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=JLDB)))",
//     // Entities
//     entities: [__dirname + '/**/*.entity{.ts,.js}'], 
//     dropSchema: false,
//     // Auto-create database tables
//     synchronize: false,
//     keepConnectionAlive: true,
//     logging: true, // Enable SQL query logging (helpful for debugging)
    
// };


// function ormConfig(): TypeOrmModuleOptions {
    
//     const ormconfig: TypeOrmModuleOptions = {
//         type: 'postgres',
//         host: process.env.DATABASE_HOST,
//         port: 5432,
//         database: process.env.DATABASE_NAME,
//         username: process.env.DATABASE_USERNAME, 
//         password: process.env.DATABASE_PASSWORD, 
//         entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         autoLoadEntities: true,
//         migrations: [__dirname + '/**/migrations/*.js'],
//         migrationsTableName: 'migrations',
//         synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
//         logging: false,    
//     }

//     return ormconfig;
// }

// export { ormConfig }
