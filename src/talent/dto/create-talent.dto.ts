import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateTalentDto extends CreateUserDto {
    id: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
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
}
