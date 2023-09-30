export declare class eSchool {
    readonly username: string;
    readonly password: string;
    readonly token: string;
    constructor(username: string, password: string);
    /**
     * Get JSESSIONID. It is used to auth your requests
     * @returns {Promise<string>} JSESSIONID
     */
    getSessionId(): Promise<string>;
}
