import subjectsService from '../services/SubjectsService.mjs';
import { Subject } from '../models/models.mjs';

import express from 'express';
const router = express.Router();

router.get("/all", getAllSubjects);
router.get("/all/:limit", getAllSubjects);
export async function getAllSubjects(req, res, next) {
    const limit = parseInt(req.params.limit) || undefined;

    const subjects = await subjectsService.getAllSubjects(limit);

    if (!subjects)
        return res.status(409).json({ message: "An error occurred while getting subjects." });

    res.status(200).send(JSON.stringify(subjects));
}

router.get("/search", searchSubjectsByName);
export async function searchSubjectsByName(req, res, next) {
    // search?q=value
    const search = req.query.q;

    const subjects = await subjectsService.searchSubjectsByName(search);

    if (!subjects)
        return res.status(409).json({ message: "An error occurred while getting subjects." });

    res.status(200).send(JSON.stringify(subjects));
}

router.get("/:id", getSubject);
export async function getSubject(req, res, next) {
    const subjectId = req.params.id;

    const subject = await subjectsService.getSubjectById(subjectId);
    if (!subject)
        return res.status(409).json({ message: "An error occurred while getting the subject." });

    if (!subject.isValid())
        return res.status(404).json({ message: `Subject with id '${subjectId}' not found.` });

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