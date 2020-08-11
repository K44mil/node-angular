import { Role } from './Role';

export class AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
}