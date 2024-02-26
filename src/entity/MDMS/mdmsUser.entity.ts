import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('WDB_ZTEST_USER')
export class MdmsUserEntity {
   
    @PrimaryColumn()
    SEQ: number;

    @Column({ type: 'varchar2', length: 100, comment: '사용자 ID' })
    ID: string;

    @Column({ type: 'varchar2', length: 100, comment: '사용자명' })
    NAME: string;

    @Column({ type: 'varchar2', length: 500, comment: '비밀번호' })
    PASSWD: string;

    @Column({ nullable: true })
    PASSWD_TYPE: string;

    @Column({ nullable: true, default: 'U' })
    AUTHORITY: string;

    @Column({ nullable: true })
    PHONE: string;

    @Column({ nullable: true })
    STATUS: string;

    @Column({ nullable: true })
    REG_ID: string;

    @Column({ nullable: true })
    REG_DATE: Date;

    @Column({ nullable: true })
    UPT_ID: string;

    @Column({ nullable: true })
    UPT_DATE: Date;

    @Column({ nullable: true })
    BP_SEQ: number;

    @Column({ default: 'N' })
    MAIN_YN: string;

    @Column({ nullable: true, default: 'N' })
    POLICIES_YN: string;

    @Column({ nullable: true, default: 'N' })
    PRIVACY_YN: string;

    @Column({ nullable: true, default: 'N' })
    INFORMATION_SHARE_YN: string;

    @Column({ nullable: true, default: 'N' })
    MARKETING_SMS_YN: string;

    @Column({ nullable: true, default: 'N' })
    MARKETING_EMAIL_YN: string;


}
