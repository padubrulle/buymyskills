import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterDto } from './create-recruiter.dto';

export class UpdateRecruiterDto extends PartialType(CreateRecruiterDto) {
    company?: { 
        id: string; 
        name: string; 
    };
    job_title?: string;
}
