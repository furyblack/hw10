import {SessionType} from "../types/session/sessionType";
import {sessionCollection, SessionModel} from "../db/db";


export class SessionRepository{

    static async createSession(session:SessionType ){
        await SessionModel.create(session)
    }
    static async findSessionByDeviceId(deviceId: string): Promise<SessionType | null> {
        return await SessionModel.findOne({ deviceId });
    }

    static async updateSession(session: SessionType): Promise<void> {
        await SessionModel.updateOne(
            { deviceId: session.deviceId },
            { $set: {  lastActiveDate: session.lastActiveDate } }
        );
    }
    static async deleteSessionByDeviceId(deviceId: string): Promise<void> {
        await SessionModel.deleteOne({ deviceId });
    }

    static async getActiveDevices(userId: string): Promise<SessionType[]> {
        return await SessionModel.find({ userId }).lean();
    }
}