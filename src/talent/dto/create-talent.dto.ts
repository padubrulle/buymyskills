import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateTalentDto extends CreateUserDto {
    id: string;
    user: {
        id: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone: string;
        role: 'recruiter' | 'talent';
        created_at: string;
        updated_at: string;
        country: string;
        city: string;
        timezone: string;
        language: string;
        is_verified: boolean;
        last_login: string;
        failed_login_attempts: number;
    }
    current_company?: {
        id: string;
        name: string;
    }
    job_title?: string;
    bio?: string;
    status?: string;
    portfolio_url?: string;
    is_available?: boolean;
    company_id: string;
}
