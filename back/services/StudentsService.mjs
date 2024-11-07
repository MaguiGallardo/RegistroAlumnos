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
        const studentCopy = Object.assign({}, student)
        delete studentCopy.subjectsDetails;

        var result = await dbClient.insertOne(this.collectionName, studentCopy);

        return result.acknowledged
            ? new Student({ ...studentCopy, _id: result.insertedId })
            : Student.invalidStudent;
    }

    async deleteStudent(id) {
        var result = await dbClient.deleteOneID(this.collectionName, id);
        return result.acknowledged && result.deletedCount > 0;
    }

    async updateStudent(student) {
        const studentCopy = Object.assign({}, student)
        delete studentCopy.subjectsDetails;

        var result = await dbClient.updateOneID(this.collectionName, studentCopy);

        return result.acknowledged && result.matchedCount > 0
            ? new Student(studentCopy)
            : Student.invalidStudent;
    }

    //region Assign subjects
    async assignSubjectsToStudent(studentId, subjectsIds) {
        if (!Array.isArray(subjectsIds)) throw new Error("subjectsIds must be an array");

        // get student
        const student = await this.getStudentById(studentId);
        if (!student.isValid()) return Student.invalidStudent;

        // filter subjects that student already has 
        const filteredSubjectsIds = subjectsIds.filter(
            subjectId1 => !student.subjectsIds.some(subjectId2 => subjectId1 === subjectId2.toString())
        );

        // get subjects
        const subjectsToAdd = await subjectsService.getSubjectsByIds(filteredSubjectsIds);

        // add to student
        const subjectsToAddIds = subjectsToAdd.map(subject => subject._id);
        student.subjectsIds.push(...subjectsToAddIds);
        student.subjectsDetails.push(...subjectsToAdd);

        // update
        const updatedStudent = await this.updateStudent(student);
        if (!updatedStudent.isValid()) return Student.invalidStudent;

        // get student with subjectsDetails
        return await this.getStudentById(studentId);
    }

    async removeSubjectsFromStudent(studentId, subjectsIds) {
        if (!Array.isArray(subjectsIds)) throw new Error("subjectsIds must be an array");

        // get student
        const student = await this.getStudentById(studentId);
        if (!student.isValid()) return Student.invalidStudent;

        // remove the subjects from student
        student.subjectsIds = student.subjectsIds.filter(
            subjectId => !subjectsIds.includes(subjectId.toString())
        );

        // update
        const updatedStudent = await this.updateStudent(student);
        if (!updatedStudent.isValid()) return Student.invalidStudent;

        // get student with subjectsDetails
        return await this.getStudentById(studentId);
    }

}

const studentsService = new StudentsService();
export default studentsService;