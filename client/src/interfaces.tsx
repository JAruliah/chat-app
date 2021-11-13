export interface Message {
    room?:string,
    author:string,
    message:string,
    time:string
}
export interface User {
    userName:string,
    room:string,
    id:string
}