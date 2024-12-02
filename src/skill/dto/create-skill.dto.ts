export class CreateSkillDto {
  id?: string;
  name: string;
  base_price?: number;
  description?: string;
  img_url?: string;
  multiplying_factor?: number;
  category?: {
    id: string;
  }
  level_id?: number;
}
