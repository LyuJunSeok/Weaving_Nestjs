import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('TEST')
export class TestEntity {
   
    @PrimaryColumn()
    SEQ: number;


    // @Column()
    // ID: string;

    // @Column()
    // NAME: string;

    // @Column()
    // EMAIL: string;

}
