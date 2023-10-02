/// <reference types="./types/types.d.ts" />
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
     * Получает айди сессии и устанавливает его
     */
    login(): Promise<boolean>;
    /**
     * Возвращает объект состояния клиента
     *
     * Данные по типу айдишников, логина, данные об устройстве...
     */
    getState(): Promise<any>;
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
     * getCurrentPosition
     */
    getCurrentPosition(): Promise<any>;
}
export { eSchool };
export default eSchool;
