import {ObjectId, WithId} from "mongodb";
import {CommentModel} from "../db/db";
import {CommentMongoDbType, CommentOutputType} from "../types/comment/output-comment-type";
import {CommentMapper} from "./comment-repository";

export class QueryCommentRepository {

    static async getById(id: string): Promise<CommentOutputType | null> {
        const comment: WithId<CommentMongoDbType> | null = await CommentModel.findOne({_id: new ObjectId(id)})
        if (!comment) {
            return null
        }
        return CommentMapper.toDto(comment)
    }
}