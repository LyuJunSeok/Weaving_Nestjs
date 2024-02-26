import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { WdbBpEntity } from './WDBcBP.entity';

@Entity('WDB_USER')
@Unique(['id'])
export class WdbUserEntity {
    @PrimaryGeneratedColumn()
    index: number;

    @Column({ type: 'varchar2', length: 100, comment: '사용자 ID' })
    id: string;

    @Column({ type: 'varchar2', length: 1000, comment: '사용자 비밀번호' })
    password: string;

    @Column({ type: 'varchar2', length: 100, comment: '사용자명' })
    name: string;
    
    @Column({ type: 'varchar2', length: 200, nullable: true, comment: '사용자 별명' })
    nickname: string;

    @Column({ type: 'varchar2', length: 100, comment: '모바일번호' })
    phone: string;
    
    @Column({ type: 'varchar2', length: 200, comment: '이메일' })
    email: string;

    @Column({ type: 'varchar2', length: 50, nullable: true, default: 'weaving', comment: '로그인 방식' })
    loginType: string;    
    
    @Column({ type: 'varchar2', length: 100, default: 'user', comment: '계정 권한 : sysadmin, sysuser, admin, user' })
    accountAuthority: string;
    
    @Column({ type: 'char', length: 1, default: 'N', comment: '개인인증 Y/N' })
    personalCertification: string;
        
    @Column({ type: 'varchar2', length: 10, comment: '거래처 코드'})
    bpCode: string;
    
    @Column({ type: 'varchar2', length: 100, comment: '거래처명' })
    bpName: string;
    
    @Column({ type: 'char', length: 1, default: 'W', comment: '계정 상태 : W 대기, Y 사용, N 미사용' })
    status: string;

    @Column({ type: 'varchar2', length: 500, nullable: true })
    description: string;

    @Column( { type: 'varchar2', length: 100, default: 'system' })
    createdId: string;
    
    @CreateDateColumn({ type: 'date' })
    createdDate: Date;
    
    @Column( { type: 'varchar2', length: 100, default: 'system' })
    updatedId: string;

    @UpdateDateColumn({ type: 'date' })
    updatedDate: Date;

    /**
   * T_INTERFACE_ITEM > T_BUSINESS_PARTNER
   * @ManyToOne(() => TargetEntity, 
   *  TargetEntityName => TargetEntityName.TargetColumn, { eager: true }) 
   * Column: TargetEntity
   */
    @ManyToOne(() => WdbBpEntity, 
        WdbBp => WdbBp.userList, { eager: true })
    bp: WdbBpEntity;
   
    

    

}