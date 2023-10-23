"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eSchool = void 0;
const axios_1 = __importDefault(require("axios"));
const js_sha256_1 = require("js-sha256");
const form_data_1 = __importDefault(require("form-data"));
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
        const form = new form_data_1.default();
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
            let cause = {
                apiName: "login",
                cause: new Error("")
            };
            throw new Error("Failed to parse token from cookies.", { cause: cause });
        })
            .catch((e) => {
            let cause = {
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
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    /**
     * Входит в систему (ставит валидный айди сессии)
     */
    async login() {
        this.sessionId = await this.getSessionId();
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
            let cause = {
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
    /**
     * Получает активные ветки (чаты)
     *
     * @param newOnly Показывать только новые ветки?
     * @param row Не уверен что это
     * @param rowsCount Число рядов
     */
    async getThreads(newOnly, row, rowsCount) {
        return axios_1.default
            .get(`https://app.eschool.center/ec-server/chat/threads?newOnly=${newOnly}&row=${row}&rowsCount=${rowsCount}`, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            let cause = {
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
    async getThread(threadId) {
        return axios_1.default
            .get(`https://app.eschool.center/ec-server/chat/thread?threadId=${threadId}`, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            let cause = {
                apiName: "getThread",
                cause: e
            };
            throw new Error(`Failed to get thread.`, { cause: cause });
        });
    }
    /**
     * Получает сообщения в ветке (чате)
     */
    async getMessages(options) {
        return axios_1.default
            .put(`https://app.eschool.center/ec-server/chat/messages?getNew=${options.getNew}&isSearch=${options.isSearch}&rowStart=${options.rowStart}&rowsCount=${options.rowsCount}&threadId=${options.threadId}`, {
            msgNums: options.msgNums,
            searchText: options.searchText
        }, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            let cause = {
                apiName: "getMessages",
                cause: e
            };
            throw new Error(`Failed to get messages.`, { cause: cause });
        });
    }
    /**
     * Отправить сообщение в ветку (чат)
     *
     * @param threadId Айди ветки (чата)
     * @param msgText Сообщение
     * @param msgUID Вроде как айди сообщения, но его особо не проверяют
     */
    async sendMessage(threadId, msgText, msgUID) {
        msgUID = msgUID === undefined ? "" : msgUID;
        const form = new form_data_1.default();
        form.append("threadId", threadId);
        form.append("msgText", msgText);
        form.append("msgUID", msgUID);
        return axios_1.default
            .post("https://app.eschool.center/ec-server/chat/sendNew", form, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            let cause = {
                apiName: "sendMessage",
                cause: e
            };
            throw new Error(`Failed to send message.`, { cause: cause });
        });
    }
    /**
     * Сохранить ветку (чат) по prsId
     *
     * Используется что бы создавать новые чаты/группы. Так-же сохраняется в PrivateThreads
     * @see getPrivateThreads
     * @returns Айди ветки
     */
    async saveThread(options) {
        return axios_1.default
            .put(`https://app.eschool.center/ec-server/chat/saveThread`, options, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            let cause = {
                apiName: "saveThread",
                cause: e
            };
            throw new Error(`Failed to save thread.`, { cause: cause });
        });
    }
    /**
     * Получить приватные (сохраненные) ветки
     *
     * @returns Мапу с ключем prsId юзера, а значением айди ветки
     */
    async getPrivateThreads() {
        return axios_1.default
            .get(`https://app.eschool.center/ec-server/chat/privateThreads`, {
            headers: {
                Cookie: `JSESSIONID=${this.sessionId}`
            }
        })
            .then((res) => {
            return new Map(Object.entries(res.data));
        })
            .catch((e) => {
            let cause = {
                apiName: "getPrivateThreads",
                cause: e
            };
            throw new Error(`Failed to get private threads.`, { cause: cause });
        });
    }
}
exports.eSchool = eSchool;
exports.default = eSchool;
