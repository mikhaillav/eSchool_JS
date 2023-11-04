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

export declare type apiName =
	| "login"
	| "getState"
	| "getThreads"
	| "getMessages"
	| "getThread"
	| "sendMessage"
	| "saveThread"
	| "getPrivateThreads"
	| "getClassByUser"
	| "getGroupOnly"
	| "getPeriodsByGroup"
	| "getDiaryUnits"
	| "getProfileNew"
	| "getDiaryPeriod";

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

export declare type group = {
	groupId: number;
	groupName: string;
	groupTypeId: 1 | number; //FIXME: Add all of the types
	groupTypeCode: "CL"; //FIXME: Add all of the types
	begDate: number;
	begDateStr: string;
	yearId: number;
	invState: 0 | number; //FIXME: Add all of the types
	out: boolean;
};

export declare type onlyGroup = {
	groupId: number;
	groupTypeId: 1 | number; //FIXME: Add all of the types
	groupTypeCode: "CL"; //FIXME: Add all of the types
	groupName: string;
	grpCode: "ORD" | string; //FIXME: Add all of the types
	deps: Array<any>;
	periodId: number;
	classNum: number;
	classIx: string;
	classLevel: "MID" | string; //FIXME: Add all of the types
	beginDate: number;
	endDate: number;
	isFirstInUnion: boolean;
	eduId: number;
	shiftNum: number;
	finalEduDt: number;
	hasWorkload: boolean;
};

export declare type period = {
	id: number;
	periodId: number;
	level: number;
	parentId: number;
	num: number;
	name: string;
	date1: number;
	date2: number;
	date1Str: string;
	date2Str: string;
	typeId: 1 | number; //FIXME: Add all of the types
	typeCode: "Y" | string; //FIXME: Add all of the types
	typeName: "Acad. year" | string; //FIXME: Add all of the types
	leaf: boolean;
	study: boolean;
	total: boolean;
	closed: boolean;
	extra: boolean;
};

export declare type periods = {
	id: number;
	typeId: 1 | number; //FIXME: Add all of the types
	typeName: "Terms" | string; //FIXME: Add all of the types
	date1: number;
	date2: number;
	date1Str: string;
	date2Str: string;
	name: string;
	year1: number;
	year2: number;
	items: Array<period>;
};

export declare type diaryUnit = {
	unitName: string;
	unitId: number;
	overMark?: number;
	rating?: string;
	totalMark?: string;
	ttlEiId?: number;
	ttlItCode?: "Q" | string; //FIXME: Add all of the types
	ttlEiName?: string;
	ttlMarkTypeId?: 1 | number; //FIXME: Add all of the types
	ttlMarkTypeCode?: "PRD" | string; //FIXME: Add all of the types
	ttlLackId?: number;
	ttlIsSum?: false;
	ttlPlanUnitMaxpoint?: number;
	ttlFactUnitMaxpoint?: number;
	ttlMarkSysId?: 1 | number; //FIXME: Add all of the types
	markSysConvRules?: any; //FIXME: Add type
	markSysId?: 2 | number; //FIXME: Add all of the types
	ignoreFactTotalMaxpoint?: 0 | number;
};

export declare type diaryUnits = {
	result: Array<diaryUnit>;
};

export declare type newProfileData = {
	birthDate: string;
	email: string;
	firstName: string;
	fotoId: number;
	gender: 1 | 0;
	homePhone: string;
	lang: "eng" | "rus";
	lastName: string;
	login: string;
	middleName: string;
	mobilePhone: string;
	otherPhone: string;
	prsId: number;
};

export declare type newProfileDoc = {
	docId: number;
	docNum: string;
	docSeries: string;
	docType: "BIRTH_CERT" | string; //FIXME: Add all of the types
	docTypeId: 2 | number; //FIXME: Add all of the types
	docTypeName: string;
	issueDt: string;
	state: "DRAFT" | string; //FIXME: Add all of the types
};

export declare type address = {
	addSrc: "MANUAL" | string; //FIXME: Add all of the types
	adrText: string;
	adrTypeCode: "REG_ADDR" | "RES_ADDR";
	adrTypeId: 1 | 2;
	adrTypeName: string;
	fiasId: "MANUAL" | string; //FIXME: Add all of the types
	fiasId1: "MANUAL" | string; //WTF eschool?
	prsAdrId: number;
};

export declare type relative = {
	data: newProfileData;
	profile: newProfile;
	prsId: number;
	relCode: "MOTHER" | "FATHER"; //FIXME: Add all of the types
	relId: number;
	relName: string;
	relTypeId: 1 | 0;
};
export declare type newProfilePrsUsr = {
	creDt: string;
	crePrsId: number;
	crePrsName: string;
	orgId: number;
	orgName: string;
	orgNum: string; //it is really string
	orgShortName: string;
	posTypeCode: "S" | string; //FIXME: Add all of the types
	posTypeId: 2 | number; //FIXME: Add all of the types
	posTypeName: "Student" | string; //FIXME: Add all of the types
	userId: number;
};
export declare type newProfilePupil = {
	bvt: string;
	classId: number;
	className: string;
	classNum: number;
	eduYear: string;
	enrType: "STD_ENROLMENT" | string; //FIXME: Add all of the types
	evt: string;
	isGraduated: "true" | "false"; //...
	isReady: 1 | 0; //... why don't you like bool?
	ordDate: string;
	ordNum: string;
	orgId: number;
	orgName: string;
	orgNum: string;
	orgShortName: string;
	yearId: string;
};

export declare type newProfile = {
	birthDate: string;
	email: string;
	firstName: string;
	gender: 1 | 0;
	lastName: string;
	middleName: string;
	mobilephone: string;
	prsAdr: Array<address>;
	prsId: number;
	prsRel: Array<relative>;
	prsUsr: Array<newProfilePrsUsr>;
	abitur?: Array<any>;
	data?: newProfileData;
	docs?: Array<newProfileDoc>;
	fio?: string;
	login?: string;
	pupil?: Array<newProfilePupil>;
};

export declare type attend = {
	attendTypeId: number;
	code: string;
	name: string;
	note?: string;
	typeCatCode: "COMM" | string; //FIXME: Add all of the types
};

export declare type diaryPeriod = {
	startDt: string;
	unitId: number;
	lesNum: number;
	statusCode: "ПР" | "ЗП";
	teachFio: string;
	lessonId: number;
	subject: string;
	lptName?: string;
	mktWt?: number;
	lptColor?: string;
	markId?: number;
	markVal?: string;
	markNum?: number;
	partId?: number;
	lesNote?: string;
	markDate?: string;
	isUpdated?: 1 | 0;
	maxPoint?: number;
	isBonus?: 1 | 0;
	markSysId?: 41 | 5 | 7 | 11 | 6 | 1 | 2 | 3 | 4 | 21 | 8 | 61 | 9 | 10;
	markSysCode?: "+-" | "10" | "100" | "1000" | "12" | "5" | "5+" | "6" | "7" | "8" | "A" | "NM" | "V" | "YN";
	markValId?: number;
	attends?: Array<attend>;
};

export declare type diaryPeriods = {
	result: Array<diaryPeriod>;
};
