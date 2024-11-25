export interface IUser {
    username: string;
    token: string;
    role: 'admin' | 'user';
}