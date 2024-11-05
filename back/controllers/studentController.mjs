import studentsService from '../services/StudentsService.mjs';
import { Student } from '../models/models.mjs';

import express from 'express';
const router = express.Router();

router.get("/", getStudent);
export async function getStudent(req, res, next) {
    const studentId = req.body.id;

    const student = await studentsService.getStudent(studentId);
    console.log(student);
    if (!student.isValid())
        return res.status(409).json({ message: "An error occurred while getting the student." });

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

router.put("/", updateStudent);
export async function updateStudent(req, res, next) {
    const student = new Student(req.body);

    const updatedStudent = await studentsService.updateStudent(student);
    if (!updatedStudent.isValid())
        return res.status(409).json({ message: "An error occurred while updating the student." });

    res.status(200).send(JSON.stringify(updatedStudent));
}

router.delete("/", deleteStudent);
export async function deleteStudent(req, res, next) {
    const studentId = req.body.id;

    const deleted = await studentsService.deleteStudent(studentId);
    if (!deleted)
        return res.status(409).json({ message: "An error occurred while deleting the student." });

    res.sendStatus(200);
}

export { router };