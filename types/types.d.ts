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

export declare type apiName = "login" | "getState" | "getThreads" | "getMessages" | "getThread" | "sendMessage" | "saveThread" | "getPrivateThreads";

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

export declare type thread = {
	threadId: number;
	msgId: number;
	msgNum: number;
	senderId: number;
	senderFio: string;
	sendDate: number;
	isAllowReplay: number;
	subject: string;
	createDate: number;
	showDate: number;
	newReplayCount: number;
	attachCount: number;
	addrCnt: number;
	dlgType: number;
	msgPreview: string;
	starCnt: number;
};

export declare type message = {
	threadId: number;
	msgId: number;
	msgNum: number;
	senderId: number;
	senderFio: string;
	sendDate: number;
	msg: string;
	createDate: number;
	showDate: number;
	attachCount: number;
	stateId: number;
	readedCount: number;
	isStarred: boolean;
	isUpThread: boolean;
};

export declare type sendedMessage = {
	msgId: number;
	prsCount: number;
	msgUID: string;
	message: {
		threadId: number;
		msgId: number;
		msgNum: number;
		senderId: number;
		senderFio: string;
		stateCode: "SENDED" | string; //FIXME: Add all of the types
		stateName: string;
		msg: string;
		createDate: number;
		showDate: number;
		attachCount: number;
		msgPreview: string;
		stateId: number;
		readedCount: number;
		isStarred: boolean;
		isUpThread: boolean;
	};
};

export declare interface saveThreadOptions {
	threadId?: number;
	senderId?: number;
	imageId?: number;
	subject?: string;
	isAllowReplay: 2 | number; //FIXME: Add all of the types
	isGroup: boolean;
	interlocutor: number;
}

export declare interface getMessagesOptions {
	getNew: boolean;
	isSearch: boolean;
	rowStart: number;
	rowsCount: number;
	threadId: number;
	msgNums?: number;
	searchText?: string;
}
