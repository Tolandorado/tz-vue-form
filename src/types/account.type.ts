export type TAccount = {
    id: number
    marks: Mark[]
    type: EAccountType | null
    login: string | null
    password: string | null
}

export type Mark = {
    text: string
}

export enum EAccountType {
    LDAP = 'LDAP',
    local = 'local',
}