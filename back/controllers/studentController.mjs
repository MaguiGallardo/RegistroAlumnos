import studentsService from '../services/StudentsService.mjs';
import { Student } from '../models/models.mjs';

import express from 'express';
const router = express.Router();

router.get("/all", getAllStudents);
router.get("/all/:limit", getAllStudents);
export async function getAllStudents(req, res, next) {
    const limit = parseInt(req.params.limit) || undefined;

    const students = await studentsService.getAllStudents(limit);

    if (!students)
        return res.status(409).json({ message: "An error occurred while getting students." });

    res.status(200).send(JSON.stringify(students));
}

router.get("/:id", getStudentById);
export async function getStudentById(req, res, next) {
    const studentId = req.params.id;

    const student = await studentsService.getStudentById(studentId);

    if (!student)
        return res.status(409).json({ message: "An error occurred while getting the student." });

    if (!student.isValid())
        return res.status(404).json({ message: `Student with id '${studentId}' not found.` });

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

router.delete("/:id", deleteStudent);
export async function deleteStudent(req, res, next) {
    const studentId = req.params.id;

    const deleted = await studentsService.deleteStudent(studentId);
    if (!deleted)
        return res.status(409).json({ message: "An error occurred while deleting the student." });

    res.sendStatus(200);
}

//region Student subjects
router.put("/assign-subjects", assignSubjectsToStudent);
export async function assignSubjectsToStudent(req, res, next) {
    const { id: studentId, subjectsIds } = req.body;

    const updatedStudent = await studentsService.assignSubjectsToStudent(studentId, subjectsIds);
    if (!updatedStudent.isValid())
        return res.status(409).json({ message: "An error occurred while updating the student." });

    res.status(200).send(JSON.stringify(updatedStudent));
}

router.put("/remove-subjects", removeSubjectsFromStudent);
export async function removeSubjectsFromStudent(req, res, next) {
    const { id: studentId, subjectsIds } = req.body;

    const updatedStudent = await studentsService.removeSubjectsFromStudent(studentId, subjectsIds);
    if (!updatedStudent.isValid())
        return res.status(409).json({ message: "An error occurred while updating the student." });

    res.status(200).send(JSON.stringify(updatedStudent));
}

export { router };