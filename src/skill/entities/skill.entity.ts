import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
