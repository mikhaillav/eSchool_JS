export class eSchoolError extends Error {
	public code?: number;
	public type: "login";
	constructor(msg: string, type: "login", code?: number) {
		super(msg);
		this.code = code;
		this.type = type;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
