import { client as dbClient } from '../db/MongoDBClient.mjs';
import { Student } from '../models/models.mjs';

export class StudentsService {
    collectionName = 'Students';

    async getStudent(id) {
        var result = await dbClient.findOneIDFrom(this.collectionName, id);

        return result._id
            ? new Student(result)
            : Student.invalidStudent;
    }

    async createStudent(student) {
        var result = await dbClient.insertOne(this.collectionName, student);

        return result.acknowledged
            ? new Student({ ...student, _id: result.insertedId })
            : Student.invalidStudent;
    }

    async deleteStudent(id) {
        var result = await dbClient.deleteOneID(this.collectionName, id);
        return result.acknowledged && result.deletedCount > 0;
    }

    async updateStudent(student) {
        var result = await dbClient.updateOneID(this.collectionName, student);

        return result.acknowledged && result.matchedCount > 0
            ? new Student(student)
            : Student.invalidStudent;
    }
}

const studentsService = new StudentsService();
export default studentsService;