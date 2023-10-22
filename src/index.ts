import axios, { AxiosError } from "axios";
import { sha256 } from "js-sha256";
import { profile, device, currentPosition } from "../types/types";
import { eSchoolError } from "./error";

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
		const FormData = require("form-data");

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
				throw new eSchoolError("Failed to parse token from cookies.", "login", 0);
			})
			.catch((e: AxiosError<any, any>) => {
				switch (e.response?.data) {
					case 1:
						throw new eSchoolError("Got code: 1. Login/password error.", "login", 1);
					case 3:
						throw new eSchoolError("Got code: 3. Need to solve captcha.", "login", 3);
					case 4:
						throw new eSchoolError("Got code: 4. The account is blocked.", "login", 4);
					default:
						throw new eSchoolError(`Failed to handle error response from eSchool. Got data: ${e.response?.data}.`, "login");
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
	public async login(): Promise<boolean> {
		this.sessionId = await this.getSessionId();
		return true;
	}

	/**
	 * Возвращает объект состояния клиента
	 *
	 * Данные по типу айдишников, логина, данные об устройстве...
	 */
	public async getState(): Promise<any> {
		return axios
			.get("https://app.eschool.center/ec-server/state", {
				headers: {
					Cookie: `JSESSIONID=${this.sessionId}`
				}
			})
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				throw e;
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
}

export { eSchool };
export default eSchool;
