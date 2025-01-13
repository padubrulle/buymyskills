import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryColumn("uuid")
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: 'HTML',
    description: `The name of the skill` 
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'This is the basic skill for the web developer',
    description: `The description of the skill` 
  })
  @Column({nullable:true})
  description: string;

  @ApiProperty({
    example: 10,
    description: `The base price of the skill` 
  })
  @Column({ default: 0 })
  base_price: number;

  @ApiProperty({
    example: 1.2,
    description: `The multiplying factor of the skill` 
  })
  @Column({ default: 1 })
  multiplying_factor: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: `The image url of the skill` 
  })  
  @Column({nullable:true})
  img_url: string;

  @ApiProperty({
    example: 'ff76efe3-d145-4007-bbc0-07f5e3d7bb53',
    description: `The category id of the skill`
  })
  @Column({nullable: true})
  category_id: string | null

  @ManyToOne(() => Category,  (category) => category.skill, {nullable: true})
  @JoinColumn({name: "category_id"})
  category: Category | null
}
