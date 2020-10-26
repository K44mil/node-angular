import { Role } from '@home/modules/account/models';

export class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    isVerified: boolean;
    isBlocked: boolean;
    avatar: string;
    created_at: Date;
    updated_at: Date;
    albumNumber?: string;
}