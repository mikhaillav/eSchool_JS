"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSchool = void 0;
const axios_1 = __importDefault(require("axios"));
const js_sha256_1 = require("js-sha256");
const error_1 = require("./error");
class eSchool {
    username;
    password;
    sessionId;
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.sessionId = "";
    }
    /**
     * Получает айди сессии. Используется для аутентификации запросов
     */
    async getSessionId() {
        const FormData = require("form-data");
        const form = new FormData();
        form.append("username", this.username);
        form.append("password", (0, js_sha256_1.sha256)(this.password));
        form.append("device", `{
                cliType: "web",
                cliVer: "0.0.0",
                pushToken: "@@@@@@@@@@@@@@@@@@@Lorem ipsum dolor sit amet@@@@@@@@@@@@@@@@@@@",
                deviceName: "a can of Pepsi",
                deviceModel: "no sugar",
                cliOs: "astra linux",
                cliOsVer: null
		    }`);
        return axios_1.default
            .post("https://app.eschool.center/ec-server/login", form)
            .then((res) => {
            if (res.headers["set-cookie"] != undefined) {
                return res.headers["set-cookie"][0].split(";")[0].split("JSESSIONID=")[1];
            }
            throw new Error("Failed to parse token from cookies.");
        })
            .catch((e) => {
            switch (e.response?.data) {
                case 1:
                    throw new error_1.eSchoolError("Got code: 1. Login/password error.", 1);
                case 3:
                    throw new error_1.eSchoolError("Got code: 3. Need to solve captcha.", 3);
                case 4:
                    throw new error_1.eSchoolError("Got code: 4. The account is blocked.", 4);
                default:
                    throw new error_1.eSchoolError(`Failed to handle error response from eSchool. Got data: ${e.response?.data}.`);
            }
        });
    }
    /**
     * Устанавливает айди сессии на предоставленный
     * @param sessionId Айди сессии
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * Входит в систему (ставит валидный айди сессии)
     */
    async login() {
        this.sessionId = await this.getSessionId();
        return true;
    }
    /**
     * Возвращает объект состояния клиента
     *
     * Данные по типу айдишников, логина, данные об устройстве...
     */
    async getState() {
        return axios_1.default
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
    async getProfile() {
        let state = await this.getState();
        let profile = state.profile;
        return profile;
    }
    /**
     * Возвращает данные об устройстве клиента
     */
    async getDevice() {
        let state = await this.getState();
        let device = state.user.device;
        return device;
    }
    /**
     * Возвращает данные об образовательном учереждении
     */
    async getCurrentPosition() {
        let state = await this.getState();
        let currentPosition = state.user.currentPosition;
        return currentPosition;
    }
}
exports.eSchool = eSchool;
exports.default = eSchool;
