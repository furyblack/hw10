import * as dotenv from "dotenv";
import { BlogMongoDbType} from "../types/blogs/output";
import { PostMongoDbType} from "../types/posts/output";
import {Collection, MongoClient} from "mongodb";
import {
    BlacklistedTokenType,
    EmailConfirmationType,
    UserAccountDBType,
    UserAccountType
} from "../types/users/inputUsersType";
import {CommentMongoDbType} from "../types/comment/output-comment-type";
import {requestCountType, SessionType} from "../types/session/sessionType";

//пытаюсь подключить бд

import mongoose from "mongoose";

dotenv.config()
const mongoUri = process.env.MONGO_URL as string || "mongodb://0.0.0.0:27017" // вытащили из енви строку  подключения



export const client = new MongoClient(mongoUri);
const dbName =  process.env.mongoDBName || "mongoose DB"
const mongoDb = client.db(dbName)

const blogSchema  = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: Date, required: true}
})
export const BlogModel = mongoose.model('blogs', blogSchema)


export const userSchema = new mongoose.Schema({
    _id:  {type: String, required: true},
    accountData: {
        "userName":  {type: String, required: true},
        "email":  {type: String, required: true},
        "passwordHash":  {type: String, required: true},
        "createdAt": {type: Date, required: true}
    },
    emailConfirmation: {
        confirmationCode:  {type: String, required: true},
        expirationDate:  {type: Date, required: true},
        isConfirmed:  {type: Boolean, required: true},
    }

})
export const UserModel = mongoose.model('users', userSchema)

// export const blogCollection: Collection<BlogMongoDbType> = mongoDb.collection<BlogMongoDbType>('blog')
export const postCollection: Collection<PostMongoDbType> = mongoDb.collection<PostMongoDbType>('post')
export const commentCollection: Collection<CommentMongoDbType> = mongoDb.collection<CommentMongoDbType>('comment')
export const usersCollection: Collection<UserAccountDBType> = mongoDb.collection<UserAccountDBType>("user")
export const refreshBlackListCollection: Collection<BlacklistedTokenType> = mongoDb.collection<BlacklistedTokenType>("blacklist")
export const sessionCollection: Collection<SessionType> = mongoDb.collection<SessionType>("session")
export const requestsCountCollection: Collection<requestCountType> = mongoDb.collection<requestCountType>('requests')


export async  function connectMongo (){
    try{
        await mongoose.connect(mongoUri+"/"+dbName)
        //await client.connect(mongoUri)
        return true
    }catch (e) {
        console.log(e)
        // await client.close()
        await mongoose.disconnect()
        return false
    }
}
