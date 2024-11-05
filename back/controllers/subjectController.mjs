import subjectsService from '../services/SubjectsService.mjs';
import { Subject } from '../models/models.mjs';

import express from 'express';
const router = express.Router();

router.get("/", getSubject);
export async function getSubject(req, res, next) {
    const subjectId = req.body.id;

    const subject = await subjectsService.getSubject(subjectId);
    console.log(subject);
    if (!subject.isValid())
        return res.status(409).json({ message: "An error occurred while getting the subject." });

    res.status(200).send(JSON.stringify(subject));
}

router.post("/", createSubject);
export async function createSubject(req, res, next) {
    const subject = new Subject(req.body);

    const createdSubject = await subjectsService.createSubject(subject);
    if (!createdSubject.isValid())
        return res.status(409).json({ message: "An error occurred while creating the subject." });

    res.status(200).send(JSON.stringify(createdSubject));
}

router.put("/", updateSubject);
export async function updateSubject(req, res, next) {
    const subject = new Subject(req.body);

    const updatedSubject = await subjectsService.updateSubject(subject);
    if (!updatedSubject.isValid())
        return res.status(409).json({ message: "An error occurred while updating the subject." });

    res.status(200).send(JSON.stringify(updatedSubject));
}

router.delete("/", deleteSubject);
export async function deleteSubject(req, res, next) {
    const subjectId = req.body.id;

    const deleted = await subjectsService.deleteSubject(subjectId);
    if (!deleted)
        return res.status(409).json({ message: "An error occurred while deleting the subject." });

    res.sendStatus(200);
}

export { router };