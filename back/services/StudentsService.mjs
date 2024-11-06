import { client as dbClient } from '../db/MongoDBClient.mjs';
import { Student } from '../models/models.mjs';
import subjectsService from './SubjectsService.mjs';

export class StudentsService {
    collectionName = 'Students';

    async getAllStudents(limit = 50) {
        const results = await dbClient.getManyFrom(this.collectionName, limit > 0 ? limit : 50);
    
        // Group subject IDs in single array
        const allSubjectsIds = results.flatMap(student => student.subjectsIds);
        // Fetch subject details in one query
        const subjectsResult = await subjectsService.getSubjectsByIds(allSubjectsIds);
    
        // Map students and add subject details
        const students = results.map(studentResult => {
            // Match subjects to student subjectsIds
            const studentSubjectsDetails = studentResult.subjectsIds.map(subjectId =>
                subjectsResult.find(subject => subject._id.toString() === subjectId.toString())
            );
    
            studentResult.subjectsDetails = studentSubjectsDetails;
            return new Student(studentResult);
        });
    
        return students;
    }
    

    async getStudentById(id) {
        // get student
        var studentResult = await dbClient.findOneIDFrom(this.collectionName, id);

        // not found
        if (!studentResult._id)
            return Student.invalidStudent;

        // get subjects
        var subjectsResult = await subjectsService.getSubjectsByIds(studentResult.subjectsIds);
        studentResult.subjectsDetails = subjectsResult;

        return new Student(studentResult);
    }

    async createStudent(student) {
        delete student.subjectsDetails;

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
        delete student.subjectsDetails;

        var result = await dbClient.updateOneID(this.collectionName, student);

        return result.acknowledged && result.matchedCount > 0
            ? new Student(student)
            : Student.invalidStudent;
    }

    //region Assign subjects
    async assignSubjectsToStudent(studentId, subjectIds) {
        if (!Array.isArray(subjectIds)) throw new Error("subjectIds must be an array");

        const aggStages = [
            {
                $lookup: {
                    from: "subjects",            // lookup target collection
                    localField: "subjectIds",    // students field
                    foreignField: "_id",         // field to lookup in target collection
                    as: "subjectDetails"         // output
                }
            }
        ]
        var result = await dbClient.findOneIDFrom(this.collectionName, studentId, aggStages);

        return result.acknowledged
            ? new Student({ ...student, _id: result.insertedId })
            : Student.invalidStudent;
    }
}

const studentsService = new StudentsService();
export default studentsService;