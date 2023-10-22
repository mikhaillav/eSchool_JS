import { profile, device, currentPosition, state } from "../types/types";
declare class eSchool {
    readonly username: string;
    readonly password: string;
    sessionId: string;
    constructor(username: string, password: string);
    /**
     * Получает айди сессии. Используется для аутентификации запросов
     */
    getSessionId(): Promise<string>;
    /**
     * Устанавливает айди сессии на предоставленный
     * @param sessionId Айди сессии
     */
    setSessionId(sessionId: string): void;
    /**
     * Входит в систему (ставит валидный айди сессии)
     */
    login(): Promise<undefined>;
    /**
     * Возвращает объект состояния клиента
     *
     * Данные по типу айдишников, логина, данные об устройстве...
     */
    getState(): Promise<state>;
    /**
     * Возвращает профиль клиента
     *
     * Данные по типу фио, дата рождения, номера телефонов...
     */
    getProfile(): Promise<profile>;
    /**
     * Возвращает данные об устройстве клиента
     */
    getDevice(): Promise<device>;
    /**
     * Возвращает данные об образовательном учереждении
     */
    getCurrentPosition(): Promise<currentPosition>;
}
export { eSchool };
export default eSchool;
