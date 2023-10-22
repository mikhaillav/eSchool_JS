import { profile, device, currentPosition, state, thread, sendedMessage, message } from "../types/types";
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
     *
     * @param getNew Брать только новые (непрочитанные) сообщения?
     * @param isSearch Режим посика? (не уверен)
     * @param rowStart С какого по счету сообщения начинать
     * @param rowsCount Количество возвращаемых сообщений
     * @param threadId Айди ветки (чата)
     * @param msgNums Не уверен
     * @param searchText Текст для поиска (не уверен)
     */
    getMessages(getNew: boolean, isSearch: boolean, rowStart: number, rowsCount: number, threadId: number, msgNums?: number, searchText?: string): Promise<Array<message>>;
    sendMessage(threadId: number, msgText: string, msgUID?: string): Promise<sendedMessage>;
}
export { eSchool };
export default eSchool;
