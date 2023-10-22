export class eSchoolError extends Error {
	public code?: number;
	constructor(msg: string, name: "login", code?: number) {
		super(msg);
        this.name = name;
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
