import { isValidID } from "../utils/utils.mjs";

export class Student {
    _id = undefined;

    fullname = '';
    age = 0;

    static invalidStudent = new Student();

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
}

export class Subject {
    _id = undefined;

    title = '';

    static invalidSubject = new Subject();

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
}