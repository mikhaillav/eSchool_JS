export declare class eSchoolError extends Error {
    code?: number;
    type: "login";
    constructor(msg: string, type: "login", code?: number);
}
