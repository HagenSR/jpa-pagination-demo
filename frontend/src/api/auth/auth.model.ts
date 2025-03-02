export interface Auth {
    id: PropertyKey,
    authorities: string[]
    expires: number
    username?: string
    password?: string
}
