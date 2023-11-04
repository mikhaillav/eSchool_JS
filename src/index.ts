import axios, { AxiosError } from "axios";
import { sha256 } from "js-sha256";
import {
	profile,
	device,
	currentPosition,
	errorCause,
	state,
	thread,
	sendedMessage,
	message,
	saveThreadOptions,
	getMessagesOptions,
	group,
	onlyGroup,
	periods,
	diaryUnits,
	newProfile,
    diaryPeriods
} from "../types/types";
import FormData from "form-data";

class eSchool {
	readonly username: string;
	readonly password: string;
	sessionId: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
		this.sessionId = "";
	}

	/**
	 * Получает айди сессии. Используется для аутентификации запросов
	 */
	public async getSessionId(): Promise<string> {
		const form = new FormData();
		form.append("username", this.username);
		form.append("password", sha256(this.password));
		form.append(
			"device",
			`{
                cliType: "web",
                cliVer: "0.0.0",
                pushToken: "@@@@@@@@@@@@@@@@@@@Lorem ipsum dolor sit amet@@@@@@@@@@@@@@@@@@@",
                deviceName: "a can of Pepsi",
                deviceModel: "no sugar",
                cliOs: "astra linux",
                cliOsVer: null
		    }`
		);

		return axios
			.post("https://app.eschool.center/ec-server/login", form)
			.then((res) => {
				if (res.headers["set-cookie"] != undefined) {
					return res.headers["set-cookie"][0].split(";")[0].split("JSESSIONID=")[1];
				}

				let cause: errorCause = {
					apiName: "login",
					cause: new Error("")
				};
				throw new Error("Failed to parse token from cookies.", { cause: cause });
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "login",
					cause: e
				};
				switch (e.response?.data) {
					case 1:
						cause.code = 1;
						throw new Error("Got code: 1. Login/password error.", { cause: cause });
					case 3:
						cause.code = 3;
						throw new Error("Got code: 3. Need to solve captcha.", { cause: cause });
					case 4:
						cause.code = 4;
						throw new Error("Got code: 4. The account is blocked.", { cause: cause });
					default:
						cause.code = e.response?.data;
						throw new Error(`Failed to handle error response from eSchool. Got data: ${e.response?.data}.`, { cause: cause });
				}
			});
	}

	/**
	 * Устанавливает айди сессии на предоставленный
	 * @param sessionId Айди сессии
	 */
	public setSessionId(sessionId: string) {
		this.sessionId = sessionId;
	}

	/**
	 * Входит в систему (ставит валидный айди сессии)
	 */
	public async login(): Promise<undefined> {
		this.sessionId = await this.getSessionId();
	}

	/**
	 * Возвращает объект состояния клиента
	 *
	 * Данные по типу айдишников, логина, данные об устройстве...
	 */
	public async getState(): Promise<state> {
		return axios
			.get("https://app.eschool.center/ec-server/state", {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getState",
					cause: e
				};
				throw new Error(`Failed to get state.`, { cause: cause });
			});
	}

	/**
	 * Возвращает профиль клиента
	 *
	 * Данные по типу фио, дата рождения, номера телефонов...
	 */
	public async getProfile(): Promise<profile> {
		let state = await this.getState();
		let profile: profile = state.profile;
		return profile;
	}

	/**
	 * Возвращает данные об устройстве клиента
	 */
	public async getDevice(): Promise<device> {
		let state = await this.getState();
		let device: device = state.user.device;
		return device;
	}

	/**
	 * Возвращает данные об образовательном учереждении
	 */
	public async getCurrentPosition(): Promise<currentPosition> {
		let state = await this.getState();
		let currentPosition: currentPosition = state.user.currentPosition;
		return currentPosition;
	}

	/**
	 * Получает активные ветки (чаты)
	 *
	 * @param newOnly Показывать только новые ветки?
	 * @param row Не уверен что это
	 * @param rowsCount Число рядов
	 */
	public async getThreads(newOnly: boolean, row: number, rowsCount: number): Promise<Array<thread>> {
		return axios
			.get(`https://app.eschool.center/ec-server/chat/threads?newOnly=${newOnly}&row=${row}&rowsCount=${rowsCount}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getThreads",
					cause: e
				};
				throw new Error(`Failed to get threads.`, { cause: cause });
			});
	}

	/**
	 * Получает конкретную ветку (чат)
	 *
	 * @param threadId Айди ветки
	 */
	public async getThread(threadId: number): Promise<thread> {
		return axios
			.get(`https://app.eschool.center/ec-server/chat/thread?threadId=${threadId}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getThread",
					cause: e
				};
				throw new Error(`Failed to get thread.`, { cause: cause });
			});
	}

	/**
	 * Получает сообщения в ветке (чате)
	 */
	public async getMessages(options: getMessagesOptions): Promise<Array<message>> {
		return axios
			.put(
				`https://app.eschool.center/ec-server/chat/messages?getNew=${options.getNew}&isSearch=${options.isSearch}&rowStart=${options.rowStart}&rowsCount=${options.rowsCount}&threadId=${options.threadId}`,
				{
					msgNums: options.msgNums,
					searchText: options.searchText
				},
				{
					headers: {
						Cookie: `JSESSIONID=${this.sessionId}`
					}
				}
			)
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				let cause: errorCause = {
					apiName: "getMessages",
					cause: e
				};
				throw new Error(`Failed to get messages.`, { cause: cause });
			});
	}

	/**
	 * Отправляет сообщение в ветку (чат)
	 *
	 * @param threadId Айди ветки (чата)
	 * @param msgText Сообщение
	 * @param msgUID Вроде как айди сообщения, но его особо не проверяют
	 */
	public async sendMessage(threadId: number, msgText: string, msgUID?: string): Promise<sendedMessage> {
		msgUID = msgUID === undefined ? "" : msgUID;

		const form = new FormData();
		form.append("threadId", threadId);
		form.append("msgText", msgText);
		form.append("msgUID", msgUID);

		return axios
			.post("https://app.eschool.center/ec-server/chat/sendNew", form, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				let cause: errorCause = {
					apiName: "sendMessage",
					cause: e
				};
				throw new Error(`Failed to send message.`, { cause: cause });
			});
	}

	/**
	 * Сохраняет ветку (чат) по prsId
	 *
	 * Используется что бы создавать новые чаты/группы. Так-же сохраняется в PrivateThreads
	 * @see getPrivateThreads
	 * @returns Айди ветки
	 */
	public async saveThread(options: saveThreadOptions): Promise<number> {
		return axios
			.put(`https://app.eschool.center/ec-server/chat/saveThread`, options, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				let cause: errorCause = {
					apiName: "saveThread",
					cause: e
				};
				throw new Error(`Failed to save thread.`, { cause: cause });
			});
	}

	/**
	 * Получает приватные (сохраненные) ветки
	 *
	 * @returns Мапу с ключем prsId юзера, а значением айди ветки
	 */
	public async getPrivateThreads(): Promise<Map<string, number>> {
		return axios
			.get(`https://app.eschool.center/ec-server/chat/privateThreads`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return new Map<string, number>(Object.entries(res.data));
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getPrivateThreads",
					cause: e
				};
				throw new Error(`Failed to get private threads.`, { cause: cause });
			});
	}

	/**
	 * Получает классы(группы) пользователя
	 *
	 * @param userId Айди пользователя
	 */
	public async getClassByUser(userId: number): Promise<Array<group>> {
		return axios
			.get(`https://app.eschool.center/ec-server/usr/getClassByUser?userId=${userId}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getClassByUser",
					cause: e
				};
				throw new Error(`Failed to get class by user.`, { cause: cause });
			});
	}

	/**
	 * Получает расширенную информацию о группе (классе)
	 *
	 * @param groupId Айди группы (класса)
	 */
	public async getGroupOnly(groupId: number): Promise<onlyGroup> {
		return axios
			.get(`https://app.eschool.center/ec-server/groups/getGroupOnly?groupId=${groupId}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getGroupOnly",
					cause: e
				};
				throw new Error(`Failed to get only group.`, { cause: cause });
			});
	}

	/**
	 * Получает учебный период
	 *
	 * @param groupId Айди группы (класса)
	 * @param number Что-то непонятное, по дефолту ноль
	 */
	public async getPeriodsByGroup(groupId: number, number?: number): Promise<periods> {
		number = number == undefined ? 0 : number;

		return axios
			.get(`https://app.eschool.center/ec-server/dict/periods/${number}?groupId=${groupId}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getPeriodsByGroup",
					cause: e
				};
				throw new Error(`Failed to get periods by group.`, { cause: cause });
			});
	}

	/**
	 * Получает объекты школьных предметов
	 *
	 * @param userId Айди пользователя
	 * @param elid Айди периода
	 */
	public async getDiaryUnits(userId: number, elid: number): Promise<diaryUnits> {
		return axios
			.get(`https://app.eschool.center/ec-server/student/getDiaryUnits/?userId=${userId}&eiId=${elid}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getDiaryUnits",
					cause: e
				};
				throw new Error(`Failed to get diary units.`, { cause: cause });
			});
	}

	/**
	 * Получает расширенную информацию о профиле
	 *
	 * @param prsId Айди персоны
	 */
	public async getProfileNew(prsId: number): Promise<newProfile> {
		return axios
			.get(`https://app.eschool.center/ec-server/profile/getProfile_new?prsId=${prsId}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getProfileNew",
					cause: e
				};
				throw new Error(`Failed to get new profile.`, { cause: cause });
			});
	}

	/**
	 * Получает уроки за указанный период
	 *
	 * @param userId Айди пользователя
	 * @param elid Айди периода
	 */
	public async getDiaryPeriod(userId: number, elid: number): Promise<diaryPeriods> {
		return axios
			.get(`https://app.eschool.center/ec-server/student/getDiaryPeriod/?userId=${userId}&eiId=${elid}`, {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e: AxiosError<any, any>) => {
				let cause: errorCause = {
					apiName: "getDiaryPeriod",
					cause: e
				};
				throw new Error(`Failed to get diary period.`, { cause: cause });
			});
	}
}

export { eSchool };
export default eSchool;
