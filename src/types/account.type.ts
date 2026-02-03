export type TAccount = {
    id: number
    tags: TTag[]
    type: EAccountType | null
    login: string | null
    password: string | null
}

export type TTag = {
    text: string
}

export enum EAccountType {
    LDAP = 'LDAP',
    local = 'local',
}