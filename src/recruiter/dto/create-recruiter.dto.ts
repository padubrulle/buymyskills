import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateRecruiterDto extends CreateUserDto {
    id: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    }
    company: {
        id: string;
        name: string;
    }
    job_title: string;
}
