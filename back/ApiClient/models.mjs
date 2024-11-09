
export class Student {
    id = undefined;

    fullname = '';
    age = 0;

    // subjects with details
    subjects = [];

    static invalidStudentRes = new Student();

    constructor(data = null) {
        if (data)
            this.updateProperties(data);
    }
    updateProperties(data) {
        // Convert each Object to a Subject
        if (Array.isArray(data.subjects) && !(data.subjects[0] instanceof Subject)) {
            data.subjects = data.subjects.map(s => new Subject(s));
        }

        for (let key in this) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    isValid() { return isValidID(this._id); }

    static fromStudent(student) {
        return new Student({
            id: student._id,
            subjects: student.subjectsDetails.map(subject => Subject.fromSubject(subject)),
            ...student
        });
    }
}

export class Subject {
    id = undefined;

    title = '';

    static invalidSubjectRes = new Subject();

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
        return new Subject({
            id: subject._id,
            ...subject
        });
    }
}


export function isValidID(_id) {
    return _id !== undefined && _id !== null && _id !== "";
}