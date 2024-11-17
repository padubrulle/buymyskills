import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill')
export class Skill {
  @PrimaryColumn()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({nullable:true})
  description: string;

  @Column({ default: 0 })
  base_price: number;

  @Column({ default: 1 })
  multiplying_factor: number;

  @Column({nullable:true})
  img_url: string;

  @Column({nullable:true})
  categoryId: string;

  @ManyToOne(() => Category,  (category) => category.skill, {nullable: true})
  category: Category | null
}
