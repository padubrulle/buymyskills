import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateTalentDto extends CreateUserDto {
    personal_website: string;
    current_company: string;
}
