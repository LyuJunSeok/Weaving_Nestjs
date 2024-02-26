import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('TEST_USER')
export class TestUserEntity {
   @PrimaryGeneratedColumn()
   ID?: number;
     
   @Column()
   EMAIL: string;

   @Column()
   PASSWORD: string;

   @Column()
   USERNAME: string;

   @Column()
   CDATE: Date;

}
