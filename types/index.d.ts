import { profile, device, currentPosition, state, thread, sendedMessage, message, saveThreadOptions, getMessagesOptions } from "../types/types";
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
    /**
     * Получает активные ветки (чаты)
     *
     * @param newOnly Показывать только новые ветки?
     * @param row Не уверен что это
     * @param rowsCount Число рядов
     */
    getThreads(newOnly: boolean, row: number, rowsCount: number): Promise<Array<thread>>;
    /**
     * Получает конкретную ветку (чат)
     *
     * @param threadId Айди ветки
     */
    getThread(threadId: number): Promise<thread>;
    /**
     * Получает сообщения в ветке (чате)
     */
    getMessages(options: getMessagesOptions): Promise<Array<message>>;
    /**
     * Отправить сообщение в ветку (чат)
     *
     * @param threadId Айди ветки (чата)
     * @param msgText Сообщение
     * @param msgUID Вроде как айди сообщения, но его особо не проверяют
     */
    sendMessage(threadId: number, msgText: string, msgUID?: string): Promise<sendedMessage>;
    /**
     * Сохранить ветку (чат) по prsId
     *
     * Используется что бы создавать новые чаты/группы. Так-же сохраняется в PrivateThreads
     * @see getPrivateThreads
     * @returns Айди ветки
     */
    saveThread(options: saveThreadOptions): Promise<number>;
    /**
     * Получить приватные (сохраненные) ветки
     *
     * @returns Мапу с ключем prsId юзера, а значением айди ветки
     */
    getPrivateThreads(): Promise<Map<string, number>>;
}
export { eSchool };
export default eSchool;
