import { Injectable } from '@nestjs/common';
import { Session, SessionDocument } from './schemas/session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session.name)
        private sessionModel: Model<SessionDocument>
    ) { }

    async create(createSession: Session): Promise<Session> {
        const createdSession = new this.sessionModel(createSession);
        return createdSession.save();
    }

    async findAll(): Promise<Session[]> {
        const sessions = await this.sessionModel.find().exec();
        return sessions;
    }

    async findOne(id: string): Promise<Session> {
        const session = await this.sessionModel.findById(id).exec();
        return session;
    }

    async delete(id: string): Promise<Session> {
        const session = await this.sessionModel.findByIdAndDelete(id).exec();
        return session;
    }

    async getAverageDuration(sessions: Session[]): Promise<string> {
        const totalDuration = sessions.reduce((acc, current) => {
            return acc + current.duration;
        }, 0);

        const averageDurationMs = totalDuration / sessions.length;
        let averageDuration = 0;
        let unit = '';

        if (averageDurationMs < 60000) { 
            averageDuration = averageDurationMs / 1000; 
            unit = 'S';
        } else if (averageDurationMs < 3600000) { 
            averageDuration = averageDurationMs / 60000; 
            unit = 'M';
        } else { 
            averageDuration = averageDurationMs / 3600000; 
            unit = 'H';
        }

        return `${averageDuration.toFixed(2)} ${unit}`;
    }

}
