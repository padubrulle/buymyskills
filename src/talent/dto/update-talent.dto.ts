import { PartialType } from '@nestjs/mapped-types';
import { CreateTalentDto } from './create-talent.dto';

export class UpdateTalentDto extends PartialType(CreateTalentDto) {
    portfolio_url?: string;
    current_company?: {
        id: string;
        name: string;
    };
}
