import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Report {
    
        @PrimaryGeneratedColumn()
        @Column()
        id: string;
    
        @Column()
        filters: string;
    
        @Column()
        timeScaleStart: Date;
    
        @Column()
        timeScaleEnd: Date;
    
        @Column()
        timeScaleStep: number;
    
        @Column()
        dataType: string;
    
        @Column()
        visualizationType: string;
    
        @Column()
        @ManyToOne(() => User, user => user.reports)
        user: User;
        
    
    }