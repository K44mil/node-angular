import { Role } from './Role';

export class AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    role: Role;
    token?: string;
}