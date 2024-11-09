import 'dotenv/config';
import doFetch from './fetchHelper.mjs';
import { Student, Subject } from './models.mjs';

/**
 * Provides methods to interact with the API for client-side operations.
 */
export class ApiClient {
    /**
     * Creates an instance of ApiClient.
     * @param {string} baseURL The base URL of the API.
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.subjectsRoute = 'subjects';
        this.studentsRoute = 'students';
    }


    //region Student

    /**
     * Get subjects.
     * @param {Number} limit - Limit results.
     * @returns {Promise<Array<Student>>}
     */
    async getAllStudents(limit = undefined) {
        const url = `/${this.studentsRoute}/all/` + (limit ? limit : ``);

        try {
            const response = await doFetch(this.baseURL, url);
            if (!response.ok) return Subject.invalidSubjectRes;

            const data = await response.json();
            if (!(data instanceof Array)) return [];

            return data.map(c => new Student(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * Search Students by name.
     * @param {string} search - Query: student name.
     * @returns {Promise<Array<Student>>}
     */
    async searchStudentsByName(search) {
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}/search?q=${search}`);
            const data = await response.json();
            // error - no data
            if (!(data instanceof Array))
                return [];

            return data.map(c => new Student(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * Get Student by id.
     * @param {string} id - Student id.
     * @returns {Promise<Student>}
     */
    async getStudentById(id) {
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}/${id}`);
            if (!response.ok)
                return Student.invalidStudentRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Student.invalidStudentRes;

            return new Student(data);
        } catch (err) {
            console.error(err);
            return Student.invalidStudentRes;
        }
    }

    /**
     * Create a new Student.
     * @param {Student} student - Student to create.
     * @returns {Promise<Student>}
     */
    async createStudent(student) {
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}`, "POST", student);
            if (!response.ok)
                return Student.invalidStudentRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Student.invalidStudentRes;

            return new Student(data);
        } catch (err) {
            console.error(err);
            return Student.invalidStudentRes;
        }
    }

    /**
     * Update a Student.
     * @param {Student} student - Student to update.
     * @returns {Promise<Student>}
     */
    async updateStudent(student) {
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}`, "PUT", student);
            if (!response.ok)
                return Student.invalidStudentRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Student.invalidStudentRes;

            return new Student(data);
        } catch (err) {
            console.error(err);
            return Student.invalidStudentRes;
        }
    }

    /**
     * Delete a Student.
     * @param {string} id - Student id to delete.
     * @returns {Promise<boolean>}
     */
    async deleteStudent(id) {
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}/${id}`, "DELETE");
            return response.ok;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * Assign Subjects to Student.
     * @param {string} studentId - Student id.
     * @param {Array<string>} subjectsIds - List of subjects ids to assign.
     * @returns {Promise<Student>}
     */
    async assignSubjectsToStudent(studentId, subjectsIds) {
        const body = { id: studentId, subjectsIds };
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}/assign-subjects`, "PUT", body);
            if (!response.ok)
                return Student.invalidStudentRes;

            const data = await response.json();
            if (data === null)
                return Student.invalidStudentRes;

            return new Student(data);
        } catch (err) {
            console.error(err);
            return Student.invalidStudentRes;
        }
    }

    /**
     * Remove Subjects from Student.
     * @param {string} studentId - Student id.
     * @param {Array<string>} subjectsIds - List of subjects ids to remove.
     * @returns {Promise<Student>}
     */
    async removeSubjectsFromStudent(studentId, subjectsIds) {
        const body = { id: studentId, subjectsIds };
        try {
            const response = await doFetch(this.baseURL, `/${this.studentsRoute}/remove-subjects`, "PUT", body);
            if (!response.ok)
                return Student.invalidStudentRes;

            const data = await response.json();
            if (data === null)
                return Student.invalidStudentRes;

            return new Student(data);
        } catch (err) {
            console.error(err);
            return Student.invalidStudentRes;
        }
    }

    //region Subjects

    /**
     * Get subjects.
     * @param {Number} limit - Limit results.
     * @returns {Promise<Array<Subject>>}
     */
    async getAllSubjects(limit = undefined) {
        const url = `/${this.subjectsRoute}/all/` + (limit ? limit : ``);

        try {
            const response = await doFetch(this.baseURL, url);
            const data = await response.json();
            // error - no data
            if (!(data instanceof Array))
                return [];

            return data.map(c => new Subject(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * Search Subjects by title.
     * @param {string} search - Query: subject title.
     * @returns {Promise<Array<Subject>>}
     */
    async searchSubjectsByTitle(search) {
        try {
            const response = await doFetch(this.baseURL, `/${this.subjectsRoute}/search?q=${search}`);
            const data = await response.json();
            // error - no data
            if (!(data instanceof Array))
                return [];

            return data.map(c => new Subject(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * Get Subject by id.
     * @param {string} id - Subject id.
     * @returns {Promise<Subject>}
     */
    async getSubjectById(id) {
        try {
            const response = await doFetch(this.baseURL, `/${this.subjectsRoute}/${id}`);
            if (!response.ok)
                return Subject.invalidSubjectRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Subject.invalidSubjectRes;

            return new Subject(data);
        } catch (err) {
            console.error(err);
            return Subject.invalidSubjectRes;
        }
    }

    /**
     * Create a new Subject.
     * @param {Subject} subject - Subject to create.
     * @returns {Promise<Subject>}
     */
    async createSubject(subject) {
        try {
            const response = await doFetch(this.baseURL, `/${this.subjectsRoute}`, "POST", subject);
            if (!response.ok)
                return Subject.invalidSubjectRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Subject.invalidSubjectRes;

            return new Subject(data);
        } catch (err) {
            console.error(err);
            return Subject.invalidSubjectRes;
        }
    }

    /**
     * Update a Subject.
     * @param {Subject} subject - Subject to update.
     * @returns {Promise<Subject>}
     */
    async updateSubject(subject) {
        try {
            const response = await doFetch(this.baseURL, `/${this.subjectsRoute}`, "PUT", subject);
            if (!response.ok)
                return Subject.invalidSubjectRes;

            const data = await response.json();
            // error - no data
            if (data === null)
                return Subject.invalidSubjectRes;

            return new Subject(data);
        } catch (err) {
            console.error(err);
            return Subject.invalidSubjectRes;
        }
    }

    /**
     * Delete a Subject.
     * @param {string} id - Subject id to delete.
     * @returns {Promise<boolean>}
     */
    async deleteSubject(id) {
        try {
            const response = await doFetch(this.baseURL, `/${this.subjectsRoute}/${id}`, "DELETE");
            return response.ok;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}


// Initialize and export an instance of the ApiClient
const port = process.env.SERVER_PORT;
const apiClient = new ApiClient(`http://localhost:${port}`);
export default apiClient;
