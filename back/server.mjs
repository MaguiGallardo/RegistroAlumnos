import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

// Controllers
import { router as studentsRouter } from './controllers/studentController.mjs';
import { router as subjectRouter } from './controllers/subjectController.mjs';
import apiClient from './apiClient/apiClient.mjs';
import { Student, Subject } from './ApiClient/models.mjs';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Map controllers route
app.use('/students', studentsRouter);
app.use('/subjects', subjectRouter);

// server status
app.get('/health', async (req, res, next) => res.sendStatus(200));

const port = process.env.SERVER_PORT;
app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}`);
    console.log(`Now: ${new Date().toUTCString()}`);

    // testing api client :)
    //console.log(await apiClient.assignSubjectsToStudent("672ccb6e867c68f04fa180c8", ["672a34908b9821f6d60a7367", "672cc75dd54a419f06e28ee5"]));
});