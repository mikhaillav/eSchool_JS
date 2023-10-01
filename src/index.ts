import axios from "axios";
import { sha256 } from "js-sha256";

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
				throw "Failed to parse token from cookies";
			})
			.catch((e) => {
				throw e;
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
	 * Получает айди сессии и устанавливает его
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
			});
	}

	/**
	 * Возвращает профиль клиента
	 *
	 * Данные по типу фио, дата рождения, номера телефонов
	 */
	public async getProfile(): Promise<profile> {
		let state = await this.getState();
		let profile: profile = state.profile;
		return profile;
	}

	/**
	 * Возвращает данные ою устройстве клиента
     * 
     * Не знаю зачем, но пусть будет. Все данные отсюда генерируются в @see getSessionId
	 */
	public async getDevice(): Promise<device> {
		let state = await this.getState();
		let device: device = state.user.device;
		return device;
	}
}

export { eSchool };
export default eSchool;
