import express from 'express';
import morgan from 'morgan';

// Controllers
import { router as studentsRouter } from './controllers/studentController.mjs';
import { router as subjectRouter } from './controllers/subjectController.mjs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

// Map controllers route
app.use('/students', studentsRouter);
app.use('/subjects', subjectRouter);

// server status
app.get('/health', async (req, res, next) => res.sendStatus(200));

app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}`);
    console.log(`Now: ${new Date().toUTCString()}`);
});