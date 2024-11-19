import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterDto } from './create-recruiter.dto';

export class UpdateRecruiterDto extends PartialType(CreateRecruiterDto) {
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    company_role?: string;
}
