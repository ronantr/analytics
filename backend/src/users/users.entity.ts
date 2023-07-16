import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Column()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    companyName: string;

    @Column()
    password: string;

    @Column()
    roles: string;

    @Column()
    companyKBIS: string;

    @Column()
    companyURL: string;

    @Column()
    isVerified: boolean;
    @OneToMany(() => Report, report => report.user)
    reports: Report[];
}