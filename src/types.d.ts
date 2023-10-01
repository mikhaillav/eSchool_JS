declare type profile = {
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: number,
    phoneHome: string,
    phoneMob: string,
    email: string
}

declare type device = {
    prsId: number,
    pdId: number,
    cliType: 'web' | string,
    cliVer: string,
    cliOs: string,
    cliOsVer: string,
    deviceName: string,
    deviceModel: string,
    pushIsUserAllow: number,
    pushToken: string,
    isNew: boolean,
    dbSessionId: number
}