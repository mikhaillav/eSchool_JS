"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSchoolError = void 0;
class eSchoolError extends Error {
    code;
    constructor(msg, name, code, options) {
        super(msg);
        this.name = name;
        this.code = code;
        this.cause = options?.cause;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.eSchoolError = eSchoolError;
