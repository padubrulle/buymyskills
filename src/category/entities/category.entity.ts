import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Skill, (skill) => skill.category)
    skill: Skill[];
}
