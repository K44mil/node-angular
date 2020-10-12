export class RegisterUserRequest {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;    
}