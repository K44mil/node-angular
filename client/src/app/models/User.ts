import { Role } from './Role';

export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    albumNumber?: string;
}