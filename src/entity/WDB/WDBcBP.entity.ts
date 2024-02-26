import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { WdbUserEntity } from './WDBcUser.entity';

@Entity('WDB_BP')
@Unique(['code'])
export class WdbBpEntity {
    @PrimaryGeneratedColumn()
    index: number;

    @Column({ type: 'char', length: 1, default: 'W', comment: '거래처 그룹: 브랜드(공급처) B, 셀러 S, 플렛폼 P, 쇼핑몰 M, ADMIN A, ETC Z ' })
    groupCode: string;

    @Column({ type: 'varchar2', length: 10, comment: '거래처 코드'})
    code: string;

    @Column({ type: 'varchar2', length: 100, comment: '거래처명' })
    name: string;

    @Column({ type: 'varchar2', length: 200, nullable: true, comment: '거래처 영문명' })
    nameEng: string;

    @Column({ type: 'varchar2', length: 200, nullable: true, comment: '거래처 별명' })
    nickname: string;

    @Column({ type: 'varchar2', length: 20, nullable: true, comment: '사업자번호' })
    registration: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '대표자명' })
    representativeName: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '업종' })
    businessType: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '업태' })
    businessState: string;

    @Column({ type: 'char', length: 1, default: 'Y', comment: '본사 구분' })
    headoffieceYn: string;

    @Column({ type: 'varchar2', length: 10, nullable: true, comment: '본사코드' })
    headofficeCode: string;

    @Column({ type: 'varchar2', length: 200, nullable: true, comment: '주소' })
    address1: string;

    @Column({ type: 'varchar2', length: 300, nullable: true, comment: '상세 주소' })
    address2: string;

    @Column({ type: 'char', length: 6, nullable: true, comment: '우편번호' })
    postCode: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '담당자명' })
    managerName: string;

    @Column({ type: 'varchar2', length: 50, nullable: true, comment: '전화번호' })
    phone: string;

    @Column({ type: 'varchar2', length: 50, nullable: true, comment: '핸드폰번호' })
    cellPhone: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '이메일' })
    email: string;

    @Column({ type: 'number', nullable: true, comment: '은행 코드' })
    bankCode: number;

    @Column({ type: 'varchar2', length: 50, nullable: true, comment: '계좌번호' })
    bankAccountNumber: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: '예금주' })
    bankAccountHolder: string;

    @Column({ type: 'varchar2', length: 20, nullable: true, comment: '매장 위치 코드' })
    shopLocationCode: string;

    @Column({ type: 'varchar2', length: 20, nullable: true, comment: '매장 건물 코드' })
    shopBuildingCode: string;

    @Column({ type: 'varchar2', length: 20, nullable: true, comment: '매장 층수 코드' })
    shopFloorsCode: string;

    @Column({ type: 'varchar2', length: 300, nullable: true, comment: '매장 상세 주소' })
    shopLocationDetail: string;

    @Column({ type: 'varchar2', length: 300, nullable: true, comment: '쇼핑몰 URL' })
    shooppingmallUrl: string;

    @Column({ type: 'varchar2', length: 10, nullable: true, comment: 'SNS 구분 코드' })
    snsType: string;

    @Column({ type: 'varchar2', length: 100, nullable: true, comment: 'SNS 계정' })
    snsAccount: string;

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
   * @OneToMany(() => TargetEntity, 
   *  TargetEntityName => TargetEntityName.TargetColumn, { eager: false }) 
   * Column: TargetEntity
   */
    @OneToMany(() => WdbUserEntity, 
        WdbUser => WdbUser.bp, { eager: false })
    userList: WdbUserEntity[]


}