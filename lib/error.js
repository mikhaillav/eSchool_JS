"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSchoolError = void 0;
class eSchoolError extends Error {
    code;
    constructor(msg, code) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.eSchoolError = eSchoolError;
