import studentsService from '../services/StudentsService.mjs';
import { Student } from '../models/models.mjs';
import { StudentResponse } from '../models/DTOs.mjs';

import express from 'express';
const router = express.Router();

router.get("/all", getAllStudents);
router.get("/all/:limit", getAllStudents);
export async function getAllStudents(req, res, next) {
    const limit = parseInt(req.params.limit) || undefined;

    const students = await studentsService.getAllStudents(limit);

    if (!students)
        return res.status(409).json({ message: "An error occurred while getting students." });

    // map to DTO
    const studentsRes = students.map(s => StudentResponse.fromStudent(s));
    res.status(200).send(JSON.stringify(studentsRes));
}

router.get("/search", searchStudentsByName);
export async function searchStudentsByName(req, res, next) {
    // search?q=value
    const search = req.query.q;

    const students = await studentsService.searchStudentsByName(search);

    if (!students)
        return res.status(409).json({ message: "An error occurred while getting students." });

    // map to DTO
    const studentsRes = students.map(s => StudentResponse.fromStudent(s));
    res.status(200).send(JSON.stringify(studentsRes));
}

router.get("/:id", getStudentById);
export async function getStudentById(req, res, next) {
    const studentId = req.params.id;

    const student = await studentsService.getStudentById(studentId);

    if (!student)
        return res.status(409).json({ message: "An error occurred while getting the student." });

    if (!student.isValid())
        return res.status(404).json({ message: `Student with id '${studentId}' not found.` });

    // map to DTO
    const studentRes = StudentResponse.fromStudent(student);
    res.status(200).send(JSON.stringify(studentRes));
}

router.post("/", createStudent);
export async function createStudent(req, res, next) {
    const student = new Student(req.body);

    const createdStudent = await studentsService.createStudent(student);
    if (!createdStudent.isValid())
        return res.status(409).json({ message: "An error occurred while creating the student." });

    // map to DTO
    const studentRes = StudentResponse.fromStudent(createdStudent);
    res.status(200).send(JSON.stringify(studentRes));
}

router.put("/", updateStudent);
export async function updateStudent(req, res, next) {
    const studentReq = req.body;

    // get original
    const student = await studentsService.getStudentById(studentReq.id);
    if (!student)
        return res.status(404).json({ message: "Student not found" });

    // update only keys in request
    student.updateProperties(studentReq);

    const updatedStudent = await studentsService.updateStudent(student);
    if (!updatedStudent.isValid())
        return res.status(409).json({ message: "An error occurred while updating the student." });

    // map to DTO
    const studentRes = StudentResponse.fromStudent(updatedStudent);
    res.status(200).send(JSON.stringify(studentRes));
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

    // map to DTO
    const studentRes = StudentResponse.fromStudent(updatedStudent);
    res.status(200).send(JSON.stringify(studentRes));
}

router.put("/remove-subjects", removeSubjectsFromStudent);
export async function removeSubjectsFromStudent(req, res, next) {
    const { id: studentId, subjectsIds } = req.body;

    const updatedStudent = await studentsService.removeSubjectsFromStudent(studentId, subjectsIds);
    if (!updatedStudent.isValid())
        return res.status(409).json({ message: "An error occurred while updating the student." });

    // map to DTO
    const studentRes = StudentResponse.fromStudent(updatedStudent);
    res.status(200).send(JSON.stringify(studentRes));
}

export { router };