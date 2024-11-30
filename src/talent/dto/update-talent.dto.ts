import { PartialType } from '@nestjs/mapped-types';
import { CreateTalentDto } from './create-talent.dto';
import { Company } from 'src/Company/entities/company.entity';

export class UpdateTalentDto extends PartialType(CreateTalentDto) {
    personal_website?: string;
    current_company?: {
        id: string;
        name: string;
    };
}
