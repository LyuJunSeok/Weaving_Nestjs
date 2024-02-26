import { DataSource } from "typeorm"

export const devOraDB = new DataSource({
  type: 'oracle',
  host: process.env.ORACLE_DATABASE_HOST,
  port: 1521,
  sid: process.env.ORACLE_DATABASE_SID,
  username: process.env.ORACLE_DATABASE_USERNAME,
  password: process.env.ORACLE_DATABASE_PASSWORD,
  database: process.env.ORACLE_DATABASE_NAME, 
  // Entities
  entities: [__dirname + '/**/*.entity{.ts,.js}'], 
  dropSchema: false,
  // Auto-create database tables
  synchronize: false,
  logging: true, // Enable SQL query logging (helpful for debugging)
});



