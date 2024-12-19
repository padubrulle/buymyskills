import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryColumn("uuid")
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

  @Column({nullable: true})
  category_id: number | null

  @ManyToOne(() => Category,  (category) => category.skill, {nullable: true})
  @JoinColumn({name: "category_id"})
  category: Category | null
}
