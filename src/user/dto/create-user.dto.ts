export abstract class CreateUserDto{
    id?: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: 'recruiter' | 'talent';
    created_at: string;
    updated_at: string;
    country?: string;
    city?: string;
    timezone?: string;
    language?: string;
    is_verified: boolean;
    last_login?: string;
    failed_login_attempts?: number;
}