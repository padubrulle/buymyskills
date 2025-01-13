import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @ApiProperty({example: "HTML", required: false})
  name?: string;
  @ApiProperty({example: 10, required: false})
  base_price?: number;
  @ApiProperty({example: "Basic skill of the web developer", required: false})
  description?: string;
  @ApiProperty({example: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", required: false})
  img_url?: string;
  @ApiProperty({example: 10, required: false}) 
  multiplying_factor?: number;
  @ApiProperty({example: "14202e1c-7afc-4e78-bc07-954f528a71a9", required: false})
  category_id?: string;
  @ApiProperty({example: 3, required: false})
  level_id?: number;
}
