export type Account = {
    id: number
    marks: Mark[]
    type: AccountType | null
    login: string | null
    password: string | null
}

export type Mark = {
    text: string
}

export enum AccountType {
    LDAP = 'LDAP',
    local = 'local',
}