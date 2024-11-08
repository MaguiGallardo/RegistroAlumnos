
export class StudentResponse {
    id = undefined;

    fullname = '';
    age = 0;

    // subjects with details
    subjects = [];

    static invalidStudentRes = new StudentResponse();

    constructor(data = null) {
        if (data)
            this.updateProperties(data);
    }
    updateProperties(data) {
        for (let key in this) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    isValid() { return isValidID(this._id); }

    static fromStudent(student) {
        return new StudentResponse({
            id: student._id,
            subjects: student.subjectsDetails.map(subject => SubjectResponse.fromSubject(subject)),
            ...student
        });
    }
}

export class SubjectResponse {
    id = undefined;

    title = '';

    static invalidSubjectRes = new SubjectResponse();

    constructor(data = null) {
        if (data)
            this.updateProperties(data);
    }
    updateProperties(data) {
        for (let key in this) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    isValid() { return isValidID(this._id); }

    static fromSubject(subject) {
        return new SubjectResponse({
            id: subject._id,
            ...subject
        });
    }
}


export function isValidID(_id) {
    return _id !== undefined && _id !== null && _id !== "";
}