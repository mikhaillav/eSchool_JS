export declare type profile = {
	firstName: string;
	lastName: string;
	middleName: string;
	birthDate: number;
	phoneHome: string;
	phoneMob: string;
	email: string;
};

export declare type device = {
	prsId: number;
	pdId: number;
	cliType: "web" | string;
	cliVer: string;
	cliOs: string;
	cliOsVer: string;
	deviceName: string;
	deviceModel: string;
	pushIsUserAllow: number;
	pushToken: string;
	isNew: boolean;
	dbSessionId: number;
};

export declare type currentPosition = {
	prsId: number;
	prsFio: string;
	userId: number;
	orgId: number;
	orgName: string;
	orgFullName: string;
	posId: number;
	posName: string;
	activeSessionId: number;
	isOrgAdmin: boolean;
	codeLang: "eng";
	iso2: "en";
	idLogo: number;
	lastChanged: number;
	posTypeCode: string;
	orgnum: string;
	baseUrl: string;
	isReady: number;
	orgYearId: number;
};

export declare type apiName = "login" | "getState";

export declare type errorCause = {
	apiName: apiName;
	cause: Error;
	code?: number;
};

export declare type state = {
	abtUnitId: number;
	authenticated: boolean;
	kindergartenId: number;
	links: Array<any>;
	menu: any;
	noKindergartenId: number;
	params: any;
	profile: profile;
	user: user;
	userId: number;
};

export declare type user = {
	codeLang: "eng" | "rus";
	currentPosition: currentPosition;
	device: device;
	iso2: "en" | "ru";
	menu: any;
	orgId: number;
	orgYearId: number;
	personalized: boolean;
	positions: Array<currentPosition>;
	prsId: number;
	regCount: number;
	roles: Array<any>;
	sessionEnd: number;
	sessionId: number;
	userId: number;
	username: string;
	validForDays: number;
};
