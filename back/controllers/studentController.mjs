import express from 'express';
const router = express.Router();
import studentsService from '../services/StudentsService.mjs';
import { Student } from '../models/models.mjs';

router.get("/", getStudent);
export async function getStudent(req, res, next) {
    const studentId = req.body.id;

    const student = await studentsService.getStudent(studentId);
    console.log(student);
    if (!student.isValid())
        return res.status(409).json({ message: "An error occurred while creating the student." });

    res.status(200).send(JSON.stringify(student));
}

router.post("/", createStudent);
export async function createStudent(req, res, next) {
    const student = new Student(req.body);

    const createdStudent = await studentsService.createStudent(student);
    if (!createdStudent.isValid())
        return res.status(409).json({ message: "An error occurred while creating the student." });

    res.status(200).send(JSON.stringify(createdStudent));
}

export { router };