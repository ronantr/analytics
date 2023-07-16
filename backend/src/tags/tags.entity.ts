import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    comment: string;

    @Column()
    companyName: string;

    @Column()
    deleted: boolean;
}