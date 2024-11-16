import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Skill, (skill) => skill.category)
    skill: Skill;
}
