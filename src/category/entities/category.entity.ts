import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn("uuid")
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Skill, (skill) => skill.category)
    skill: Skill[];
}
