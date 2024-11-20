import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateRecruiterDto extends CreateUserDto {
    company: string;
    company_role: string;
}
