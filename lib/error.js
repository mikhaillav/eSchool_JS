"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSchoolError = void 0;
class eSchoolError extends Error {
    code;
    type;
    constructor(msg, type, code) {
        super(msg);
        this.code = code;
        this.type = type;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.eSchoolError = eSchoolError;
