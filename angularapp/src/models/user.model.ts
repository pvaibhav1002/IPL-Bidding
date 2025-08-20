export type Role = 'ADMIN' | 'ORGANIZER';

export interface User{
    id?:number;
    username?:string;
    password?:string;
    role?:string;
    token?:string;
}