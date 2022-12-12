export interface User {
    _id?: string
    name: string
    img: string
    email: string
    subscribers: number
    subscribedUsers: [string]
    token: string
}
