import { isValidID } from "../utils/utils.mjs";

export class Student {
    _id = undefined;

    fullname = '';
    age = 0;

    // subjects
    subjectsIds = [];        // ids
    subjectsDetails = [];    // details

    static invalidStudent = new Student();

    constructor(data = null) {
        if (data) {
            this._id = data.id; // support to use id as _id 
            this.updateProperties(data);
        }
    }
    updateProperties(data) {
        for (let key in this) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    isValid() { return isValidID(this._id); }
}

export class Subject {
    _id = undefined;

    title = '';

    static invalidSubject = new Subject();

    constructor(data = null) {
        if (data) {
            this._id = data.id; // support to use id as _id 
            this.updateProperties(data);
        }
    }
    updateProperties(data) {
        for (let key in this) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    isValid() { return isValidID(this._id); }
}