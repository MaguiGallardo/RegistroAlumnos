import { client as dbClient } from '../db/MongoDBClient.mjs';
import { Subject } from '../models/models.mjs';

export class SubjectsService {
    collectionName = 'Subjects';

    async getAllSubjects(limit = 50) {
        var results = await dbClient.getManyFrom(this.collectionName, limit > 0 ? limit : 50);
        return results.map(r => new Subject(r));
    }

    async getSubjectById(id) {
        var result = await dbClient.findOneIDFrom(this.collectionName, id);

        return result._id
            ? new Subject(result)
            : Subject.invalidSubject;
    }

    // ids: Array<string>
    async getSubjectsByIds(ids) {
        const pipeline = [
            { $match: { "_id": { $in: dbClient.getObjectIdList(ids) } } },
        ];
        var results = await dbClient.getAggregate(this.collectionName, pipeline);

        return results.map(subject => new Subject(subject));
    }

    async createSubject(subject) {
        var result = await dbClient.insertOne(this.collectionName, subject);

        return result.acknowledged
            ? new Subject({ ...subject, _id: result.insertedId })
            : Subject.invalidSubject;
    }

    async deleteSubject(id) {
        var result = await dbClient.deleteOneID(this.collectionName, id);
        return result.acknowledged && result.deletedCount > 0;
    }

    async updateSubject(subject) {
        var result = await dbClient.updateOneID(this.collectionName, subject);

        return result.acknowledged && result.matchedCount > 0
            ? new Subject(subject)
            : Subject.invalidSubject;
    }
}

const subjectsService = new SubjectsService();
export default subjectsService;