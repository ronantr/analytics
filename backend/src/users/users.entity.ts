import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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

}