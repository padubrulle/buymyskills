export abstract class CreateUserDto{
    id?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    country: string;
    city: string;
    timezone: string;
    language: string;
    is_verified: boolean;
    last_login: Date;
    failed_login_attempts: number;
}