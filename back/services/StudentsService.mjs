import { client as dbClient } from '../db/MongoDBClient.mjs';
import { Student } from '../models/models.mjs';

export class StudentsService {
    collectionName = 'Students';

    async getAllStudents(limit = 50) {
        var results = await dbClient.getManyFrom(this.collectionName, limit > 0 ? limit : 50);
        return results.map(r => new Student(r));
    }

    async getStudentById(id) {
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